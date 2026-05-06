import React, { useContext } from "react";
import { 
  Box, Typography, Paper, Grid, Button, Stack, 
  Container, LinearProgress, Avatar 
} from "@mui/material";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { 
  AutoAwesomeRounded, 
  HistoryRounded, 
  FactCheckRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  SentimentSatisfiedAltRounded
} from "@mui/icons-material";

const UserHome = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // حساب نسبة الإنجاز بناءً على البيانات الحقيقية من الـ Onboarding
  const calculateProgress = () => {
    if (user?.onboarding_completed) return 100;

    // فحص الحقول التي تم تخزينها في الـ Onboarding
    const requiredFields = [
      user?.city,
      user?.budget,
      user?.gender,
      user?.phone
    ];

    const completedFields = requiredFields.filter(
      (field) => field !== null && field !== undefined && field !== ""
    ).length;

    // 40% كبداية للتسجيل + 15% لكل حقل يملأه
    const baseProgress = 40;
    const additionalProgress = completedFields * 15;
    const total = baseProgress + additionalProgress;

    return total > 100 ? 100 : total;
  };

  const progress = calculateProgress();

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      
      {/* SECTION 1: WELCOME & PROGRESS */}
      <Box sx={{ 
        pt: 8, pb: 10, 
        background: "linear-gradient(180deg, #F0F4FF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid #E2E8F0"
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* الترحيب */}
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
                    : "Your profile is ready! Start exploring your AI matches now."}
                </Typography>
              </Stack>
            </Grid>

            {/* شريط الإنجاز الذكي */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ 
                p: 3, borderRadius: 5, border: "1px solid #E2E8F0", 
                bgcolor: "white", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" 
              }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" fontWeight={800} color="text.secondary">
                    PROFILE COMPLETION
                  </Typography>
                  <Typography variant="h6" fontWeight={900} color={progress === 100 ? "#10B981" : "#6366F1"}>
                    {progress}%
                  </Typography>
                </Stack>

                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 10, borderRadius: 5, bgcolor: "#F1F5F9",
                    "& .MuiLinearProgress-bar": { 
                        bgcolor: progress === 100 ? "#10B981" : "#6366F1",
                        borderRadius: 5
                    } 
                  }} 
                />

                {progress < 100 ? (
                  <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                    <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                      Finish setup to unlock all features
                    </Typography>
                    <Button 
                      size="small" 
                      onClick={() => navigate("/onboarding")}
                      sx={{ textTransform: "none", fontWeight: 800, ml: 'auto' }}
                      endIcon={<ArrowForwardRounded fontSize="small" />}
                    >
                      Finish
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} alignItems="center" mt={2} sx={{ color: "#10B981" }}>
                    <CheckCircleRounded fontSize="small" />
                    <Typography variant="caption" fontWeight={800}>Everything looks great!</Typography>
                  </Stack>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* الأزرار السريعة */}
      <Container maxWidth="lg" sx={{ mt: -4, pb: 8 }}>
        <Grid container spacing={3}>
          {[
            { 
              title: user?.onboarding_completed ? "My Preferences" : "Setup Profile", 
              icon: <FactCheckRounded />, 
              path: user?.onboarding_completed ? "/user/preferences" : "/onboarding", 
              color: "#6366F1" 
            },
            { title: "Explore Matches", icon: <AutoAwesomeRounded />, path: "/user/matches", color: "#8B5CF6" },
            { title: "Sent Requests", icon: <HistoryRounded />, path: "/user/requests", color: "#F59E0B" }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                onClick={() => navigate(item.path)}
                sx={{ 
                  p: 3, borderRadius: 6, border: "1px solid #F1F5F9", bgcolor: "white",
                  cursor: "pointer", transition: "0.3s",
                  display: "flex", alignItems: "center", gap: 2,
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }
                }}
              >
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${item.color}15`, color: item.color, display: 'flex' }}>
                  {item.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={800}>{item.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* قسم المقترحات الذكي */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight={900} mb={3}>Suggested for you</Typography>
          <Paper sx={{ 
            p: 6, borderRadius: 8, 
            border: progress < 100 ? "2px dashed #E2E8F0" : "1px solid #E2E8F0", 
            textAlign: "center", 
            bgcolor: progress < 100 ? "transparent" : "white" 
          }}>
            {progress < 100 ? (
              <Typography color="text.secondary" fontWeight={500}>
                Your personalized matches will appear here once you complete the onboarding.
              </Typography>
            ) : (
              <Box>
                <Typography color="primary" fontWeight={700} mb={1}>
                  We found new potential roommates!
                </Typography>
                <Button onClick={() => navigate("/user/matches")} variant="text" sx={{ fontWeight: 800 }}>
                  View Matches
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default UserHome;