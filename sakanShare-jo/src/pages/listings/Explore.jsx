import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, FilterList, AttachMoney, Group } from "@mui/icons-material";
import api from "../../services/api";
import ListingCard from "../../components/sections/ListingCard.jsx";

const Explore = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/listings");
      setListings(res.data.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    const matchesPrice =
      maxPrice === "" || Number(item.price) <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header & Search */}
        <Stack spacing={3} mb={6} alignItems="center">
          <Typography
            variant="h3"
            fontWeight="900"
            textAlign="center"
            color="primary"
          >
            Explore Available Spaces
          </Typography>

          <TextField
            placeholder="Search by city, area, or title..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: "700px",
              bgcolor: "white",
              borderRadius: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%", maxWidth: "700px", justifyContent: "center" }}
          >
            <FormControl sx={{ minWidth: 150, bgcolor: "white" }}>
              <InputLabel>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Group fontSize="small" /> Category
                </Stack>
              </InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Student">Students</MenuItem>
                <MenuItem value="Employee">Employees</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 200"
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                minWidth: 150,
                "& .MuiOutlinedInput-root": { borderRadius: 3 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          fontWeight="600"
        >
          Showing {filteredListings.length} results
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress thickness={5} size={60} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredListings.map((listing) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={listing.listing_id || listing.id}
              >
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Explore;
