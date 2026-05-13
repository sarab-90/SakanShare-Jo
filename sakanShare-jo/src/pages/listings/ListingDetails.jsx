import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  Chip,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import { Message } from "@mui/icons-material";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import AddReviewForm from "../../components/forms/AddReviewForm.jsx";
import ReviewList from "../../components/sections/ReviewList.jsx";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")); 

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const fetchListing = async () => {
    try {
      if (!id || id === "undefined") return;
      const res = await api.get(`/listings/${id}`);
      setListing(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!listing?.owner_id) return;
    try {
      const res = await api.get(`/reviews/user/${listing.owner_id}`);
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAction = (callbackAction) => {
    if (!user) {
      toast.error("You need to login first!");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    callbackAction();
  };
  useEffect(() => {
    fetchListing();
  }, [id]);

  useEffect(() => {
    if (listing?.owner_id) {
      fetchReviews();
    }
  }, [listing?.owner_id]);

  if (!id || id === "undefined") return <Typography>Invalid ID</Typography>;

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!listing) {
    return (
      <Typography textAlign="center" mt={10}>
        Listing not found
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pb: 5 }}>
      <Paper sx={{ p: 4, mt: 5, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontWeight="800">
              {listing.title}
            </Typography>
            <Typography color="text.secondary" mt={1}>
              {listing.location}
            </Typography>
          </Box>
          <Typography variant="h4" color="secondary.main" fontWeight="800">
            ${listing.price}
          </Typography>
        </Stack>

        <Box
          component="img"
          src={listing.images || ""}
          sx={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            borderRadius: 3,
            mt: 3,
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Message />}
          sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: "bold" }}
          onClick={() => handleAction(() => console.log("Open Chat with owner"))}
        >
          Contact Landlord
        </Button>

        <Typography mt={4} variant="h6" fontWeight="700">
          About this place
        </Typography>
        <Typography mt={1} lineHeight={1.8} color="text.secondary">
          {listing.description}
        </Typography>

        <Stack direction="row" spacing={1} mt={3}>
          {listing.hasWifi && <Chip label="Free WiFi" variant="outlined" color="primary" />}
          {listing.allowPets && <Chip label="Pets Allowed" variant="outlined" color="primary" />}
          <Chip label={listing.category} color="secondary" />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mt={5}
          padding={3}
          sx={{ bgcolor: "#F8FAFC", borderRadius: 3, border: "1px solid #E2E8F0" }}
        >
          <Avatar
            src={`https://ui-avatars.com/api/?name=${listing.owner_name}&background=6366F1&color=fff`}
            sx={{ width: 64, height: 64 }}
          />
          <Box flex={1}>
            <Typography fontWeight="800" variant="h6">
              Hosted by {listing.owner_name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating value={Number(listing.owner_avg_rating) || 0} readOnly precision={0.5} size="small" />
              <Typography variant="body2" fontWeight="700">({listing.owner_avg_rating || 0})</Typography>
              <Typography variant="caption" color="text.secondary">• {listing.total_reviews || 0} reviews</Typography>
            </Stack>
          </Box>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => navigate(`/profile/${listing.owner_id}`)}
          >
            View Profile
          </Button>
        </Stack>

        <Box mt={6}>
          <Typography variant="h5" fontWeight="800" mb={3}>
            Reviews
          </Typography>

          {user ? (
             <AddReviewForm reviewedUserId={listing.owner_id} onReviewAdded={fetchReviews} />
          ) : (
            <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#EEF2FF", borderRadius: 3 }} elevation={0}>
                <Typography variant="body2" color="primary.main" fontWeight="600">
                    Want to share your experience? 
                    <Button 
                        variant="text" 
                        fontWeight="800" 
                        onClick={() => handleAction(() => {})} 
                    >
                        Login to review
                    </Button>
                </Typography>
            </Paper>
          )}

          <ReviewList reviews={reviews} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ListingDetails;