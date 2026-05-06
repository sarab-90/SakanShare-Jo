import React, { useContext, useState, useEffect } from "react";
import { 
  Box, Typography, Paper, Grid, Button, Stack, 
  Container, LinearProgress, Avatar, Card, CardMedia, CardContent, Chip, CircularProgress
} from "@mui/material";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js"; // استيراد الـ API لجلب الشقق
import { 
  AutoAwesomeRounded, 
  HistoryRounded, 
  FactCheckRounded,
  ArrowForwardRounded, 
  CheckCircleRounded, 
  SentimentSatisfiedAltRounded,
  LocationOn,
  KingBed
} from "@mui/icons-material";

const UserHome = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  // حقول جديدة لعرض الشقق
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // 1. جلب الشقق من الباك أند فور فتح الصفحة
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        // نأخذ أول 4 شقق فقط لعرضها كمعاينة
        setListings(res.data.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoadingListings(false);
      }
    };
    fetchListings();
  }, []);

  // 2. كودك الأصلي لحساب نسبة الإنجاز (دون تغيير)
  const calculateProgress = () => {
    if (user?.onboarding_completed) return 100;
    const requiredFields = [user?.city, user?.budget, user?.gender, user?.phone];
    const completedFields = requiredFields.filter(
      (field) => field !== null && field !== undefined && field !== ""
    ).length;
    const baseProgress = 40;
    const additionalProgress = completedFields * 15;
    const total = baseProgress + additionalProgress;
    return total > 100 ? 100 : total;
  };

  const progress = calculateProgress();

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      
      {/* SECTION 1: WELCOME & PROGRESS (كودك الأصلي) */}
      <Box sx={{ 
        pt: 8, pb: 10, 
        background: "linear-gradient(180deg, #F0F4FF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
                    Hello, {user?.name?.split(' ')[0] || "User"}!
                  </Typography>
                  <SentimentSatisfiedAltRounded sx={{ color: "#F59E0B", fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ color: "#64748B", fontWeight: 500, maxWidth: 500, lineHeight: 1.5 }}>
                  {progress < 100 
                    ? "Complete your profile to find the best matching roommates." 
                    : "Your profile is ready! Start exploring available apartments below."}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, borderRadius: 5, border: "1px solid #E2E8F0", bgcolor: "white" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" fontWeight={800} color="text.secondary">PROFILE COMPLETION</Typography>
                  <Typography variant="h6" fontWeight={900} color={progress === 100 ? "#10B981" : "#6366F1"}>{progress}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                {progress < 100 ? (
                  <Button size="small" onClick={() => navigate("/onboarding")} endIcon={<ArrowForwardRounded />}>Finish Setup</Button>
                ) : (
                  <Typography variant="caption" color="#10B981" fontWeight={800}>✓ Profile Optimized</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, pb: 8 }}>
        {/* الأزرار السريعة (كودك الأصلي) */}
        <Grid container spacing={3} mb={6}>
          {[
            { title: user?.onboarding_completed ? "My Preferences" : "Setup Profile", icon: <FactCheckRounded />, path: user?.onboarding_completed ? "/user/preferences" : "/onboarding", color: "#6366F1" },
            { title: "Explore Matches", icon: <AutoAwesomeRounded />, path: "/user/matches", color: "#8B5CF6" },
            { title: "Sent Requests", icon: <HistoryRounded />, path: "/user/requests", color: "#F59E0B" }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper onClick={() => navigate(item.path)} sx={{ p: 3, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, "&:hover": { transform: "translateY(-5px)", transition: "0.3s" } }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${item.color}15`, color: item.color }}>{item.icon}</Box>
                <Typography variant="subtitle1" fontWeight={800}>{item.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* SECTION 2: عرض الشقق الحقيقية (الإضافة الجديدة) */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={900}>Available Apartments</Typography>
            <Button onClick={() => navigate("/listings")} sx={{ fontWeight: 800 }}>View All</Button>
          </Stack>

          {loadingListings ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
          ) : (
            <Grid container spacing={3}>
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <Grid item xs={12} sm={6} md={3} key={listing.listing_id}>
                    <Card sx={{ borderRadius: 5, boxShadow: "none", border: "1px solid #E2E8F0" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={listing.images?.[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=500"}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" fontWeight={800} noWrap>{listing.title}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>{listing.city}, {listing.area}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={900} color="primary">{listing.price} JOD</Typography>
                          <Chip label={`${listing.rooms_count} Rooms`} size="small" sx={{ fontSize: 10 }} />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography color="text.secondary" align="center">No apartments available yet.</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        {/* SECTION 3: المقترحات الذكية (كودك الأصلي) */}
        <Box>
          <Typography variant="h5" fontWeight={900} mb={3}>Suggested for you</Typography>
          <Paper sx={{ p: 6, borderRadius: 8, border: progress < 100 ? "2px dashed #E2E8F0" : "1px solid #E2E8F0", textAlign: "center", bgcolor: progress < 100 ? "transparent" : "white" }}>
            {progress < 100 ? (
              <Typography color="text.secondary" fontWeight={500}>Finish setup to see your AI roommate matches.</Typography>
            ) : (
              <Button onClick={() => navigate("/user/matches")} variant="contained" sx={{ bgcolor: "#6366F1", px: 4, borderRadius: 3 }}>View My Matches</Button>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default UserHome;