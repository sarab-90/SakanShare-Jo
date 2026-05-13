import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { 
  Container, Grid, Paper, Typography, Avatar, Stack, 
  Rating, Divider, CircularProgress, Box, Button 
} from "@mui/material";
import { Message, StarHalf } from "@mui/icons-material";
import api from "../../services/api";
import AddReviewForm from "../../components/forms/AddReviewForm.jsx";

export default function PublicProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ total_reviews: 0, avg_rating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicData();
  }, [id]);

  const fetchPublicData = async () => {
    try {
      setLoading(true);
    
      const [userRes, reviewsRes, statsRes] = await Promise.all([
        api.get(`/users/public/${id}`), 
        api.get(`/user/${id}`),
        api.get(`/user/stats/${id}`)
      ]);

      setProfileData(userRes.data.user);
      setReviews(reviewsRes.data.reviews);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error("Error fetching public profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!profileData) return <Typography>User not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#6366F1", color: "white", mb: 4 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, bgcolor: "white", color: "#6366F1", fontSize: 40 }}>
              {profileData.name?.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight={800}>{profileData.name}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Rating value={parseFloat(stats.avg_rating)} readOnly precision={0.5} size="small" />
              <Typography variant="body2">({stats.total_reviews} Reviews)</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<Message />}
              sx={{ bgcolor: "white", color: "#6366F1", '&:hover': { bgcolor: "#f0f0f0" } }}
            >
              Contact
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <AddReviewForm reviewedUserId={id} onReviewAdded={fetchPublicData} />

          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #E2E8F0" }} elevation={0}>
            <Typography variant="h6" fontWeight={700} mb={2} display="flex" alignItems="center">
              <StarHalf sx={{ mr: 1, color: "#6366F1" }} /> What students say
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {reviews.map((rev) => (
              <Box key={rev.review_id} sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>{rev.reviewer_name}</Typography>
                  <Rating value={rev.rating} readOnly size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary">{rev.comment}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
           <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#F8FAFC" }} elevation={0}>
              <Typography variant="subtitle1" fontWeight={700}>Verification</Typography>
              <Typography variant="body2" color="text.secondary">Identity Verified ✅</Typography>
              <Typography variant="body2" color="text.secondary">Phone Verified ✅</Typography>
           </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}