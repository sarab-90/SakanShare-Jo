// صفحة تعرض جميع الـ listings بشكل Cards
// هذا هو الصفحة التي:

// تجيب كل الـ listings من الـ backend
// تعرضهم باستخدام ListingCard
// تربط بين إنشاء + عرض البيانات

import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import api from "../../services/api.js";
import ListingCard from "../../pages/listings/ListingCard.jsx";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET ALL LISTINGS
  const fetchListings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/listings");
      console.log("ALL LISTINGS :", res.data.data);
      setListings(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box mb={5}>
          <Typography variant="h4" fontWeight="800" color="primary.main">
            Available Listings
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Find your perfect room or apartment in Amman
          </Typography>
        </Box>

        {/* LOADING */}
        {loading && (
          <Box mt={10}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        {/* ERROR */}
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/* LISTINGS GRID */}
        {!loading && !error && (
          <Grid container spacing={4}>
            {listings?.map((listing) => (
              <Grid item xs={12} md={4} key={listing.listing_id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ListingsPage;
