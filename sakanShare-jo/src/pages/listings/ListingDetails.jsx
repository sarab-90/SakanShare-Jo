// → صفحة تفاصيل السكن عند الضغط على الكارد

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

import api from "../../services/api";

const ListingDetails = () => {
 const { id } = useParams();

if (!id || id === "undefined") {
  return <Typography>Invalid ID</Typography>;
}

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListing = async () => {
  try {
    if (!id) {
      console.error("ID is undefined from useParams");
      return;
    }

    const res = await api.get(`/listings/${id}`);

    setListing(res.data.data); // 🔥 مهم جدًا
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchListing();
  }, [id]);

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
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 5, borderRadius: 4 }}>

        {/* TITLE */}
        <Typography variant="h4" fontWeight="800">
          {listing.title}
        </Typography>

        {/* LOCATION */}
        <Typography color="text.secondary" mt={1}>
          {listing.location}
        </Typography>

        {/* PRICE */}
        <Typography variant="h5" color="secondary.main" mt={2}>
          ${listing.price}
        </Typography>

        {/* IMAGE */}
        <Box
          component="img"
          src={
            listing.images ||
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          }
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 3,
            mt: 3,
          }}
        />

        {/* DESCRIPTION */}
        <Typography mt={3} lineHeight={1.8}>
          {listing.description}
        </Typography>

        {/* FEATURES */}
        <Stack direction="row" spacing={1} mt={3}>
          {listing.hasWifi && <Chip label="WiFi" />}
          {listing.allowPets && <Chip label="Pets Allowed" />}
          <Chip label={listing.category} />
        </Stack>

        {/* OWNER */}
        <Stack direction="row" spacing={2} alignItems="center" mt={4}>
          <Avatar src="https://i.pravatar.cc/150?img=12" />

          <Box>
            <Typography fontWeight="700">
              {listing.owner || "Owner"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Verified User
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ListingDetails;