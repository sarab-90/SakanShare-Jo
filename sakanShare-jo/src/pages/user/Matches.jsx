import React, { useEffect, useState, useContext } from "react";
import {
  Box, Typography, Grid, Paper, Avatar, Button, Chip, 
  LinearProgress, Stack, Skeleton, Fade, Divider
} from "@mui/material";
import { 
  VerifiedUserRounded, 
  LocationOnRounded, 
  PaymentsRounded, 
  AutoAwesomeRounded,
  SendRounded
} from "@mui/icons-material";
import api from "../../services/api.js";
import { UserContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Matches = () => {
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب المستخدمين المتطابقين بناءً على الخوارزمية
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // هذا المسار يجب أن يعيد قائمة المستخدمين مع حقل match_score
        const res = await api.get("/discover"); 
        setMatches(res.data.data || []);
      } catch (err) {
        console.error("Match Fetch Error:", err);
        toast.error("Could not load matches");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMatches();
  }, [user]);

  const handleSendRequest = async (targetUserId) => {
    try {
      await api.post("/match-requests", { 
        receiver_id: targetUserId,
        message: `Hi! Based on our profile compatibility, I'd like to connect.`
      });
      toast.success("Connection request sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width="30%" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={6} key={i}><Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} /></Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 6, px: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={900} gutterBottom sx={{ color: '#1A2027' }}>
          Smart <span style={{ color: '#3f51b5' }}>Matches</span>
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We've analyzed preferences to find the most compatible roommates for your lifestyle.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {matches.map((match) => (
          <Grid item xs={12} md={6} key={match.userid}>
            <Fade in={true} timeout={500}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 5,
                  border: '1px solid #E0E4EC',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  }
                }}
              >
                {/* Match Score Badge */}
                <Box sx={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
                  <Typography variant="h4" fontWeight={900} color="primary.main">
                    {match.match_score}%
                  </Typography>
                  <Typography variant="caption" fontWeight={700} color="text.secondary">
                    COMPATIBILITY
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Avatar 
                    sx={{ width: 70, height: 70, bgcolor: 'primary.main', fontSize: '1.5rem', fontWeight: 800 }}
                  >
                    {match.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={800}>
                      {match.name} {match.match_score > 85 && <VerifiedUserRounded color="primary" sx={{ fontSize: 18, ml: 0.5 }} />}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationOnRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{match.city || "Amman"}</Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                {/* Compatibility Details */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PaymentsRounded color="action" />
                      <Typography variant="body2">Budget: <b>{match.budget} JOD</b></Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Chip 
                      icon={<AutoAwesomeRounded />} 
                      label={match.smoking ? "Smoker" : "Non-Smoker"} 
                      size="small" 
                      variant="outlined"
                      color={match.smoking ? "default" : "success"}
                    />
                  </Grid>
                </Grid>

                {/* Progress Bar */}
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" fontWeight={700}>Match Quality</Typography>
                    <Typography variant="caption" fontWeight={700}>{match.match_score}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={match.match_score} 
                    sx={{ height: 10, borderRadius: 5, bgcolor: '#F0F2F5' }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SendRounded />}
                  onClick={() => handleSendRequest(match.userid)}
                  sx={{ 
                    borderRadius: 3, 
                    py: 1.5, 
                    fontWeight: 800,
                    textTransform: 'none',
                    boxShadow: 'none'
                  }}
                >
                  Connect Now
                </Button>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {matches.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No perfect matches found yet. Try updating your preferences!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Matches;