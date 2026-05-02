import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";

import {
  FavoriteBorder,
  LocationOn,
  Wifi,
  Pets,
  KingBed,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  // 🧠 حماية أولية
  if (!listing || typeof listing !== "object") return null;

  // 🧠 ID مرن (يدعم أكثر من شكل من الباك)
  const id = listing.listing_id || listing.id;

  // إذا ما فيه id لا نكسر الصفحة
  if (!id) return null;

  // 🧠 location fallback (city / location)
  const location = listing.location || listing.city || "Unknown location";

  // 🧠 image fallback (string / array / undefined)
  const image = Array.isArray(listing.images)
    ? listing.images[0]
    : listing.images ||
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

  // 🧠 price fallback
  const price = listing.price ?? "N/A";

  const handleView = () => {
    navigate(`/listings/${id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        transition: "0.35s",
        boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.10)",
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={listing.title || "Listing image"}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ p: 3 }}>
        {/* TITLE + PRICE */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" fontWeight="800">
              {listing.title || "No title"}
            </Typography>

            <Stack direction="row" spacing={0.5} mt={0.5}>
              <LocationOn fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Stack>
          </Box>

          <Typography variant="h6" fontWeight="800" color="secondary.main">
            ${price}
          </Typography>
        </Stack>

        {/* DESCRIPTION */}
        <Typography variant="body2" color="text.secondary" mt={2}>
          {listing.description || "No description available"}
        </Typography>

        {/* FEATURES */}
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={3}>
          {listing.hasWifi && (
            <Chip icon={<Wifi />} label="WiFi" />
          )}

          {listing.allowPets && (
            <Chip icon={<Pets />} label="Pets" />
          )}

          <Chip
            icon={<KingBed />}
            label={listing.category || "Room"}
          />
        </Stack>

        {/* OWNER + BUTTON */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar src="https://i.pravatar.cc/150?img=12" />

            <Box>
              <Typography variant="body2" fontWeight="700">
                {listing.owner || "Owner"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Verified User
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            onClick={handleView}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(90deg, #6366F1, #1E293B)",
            }}
          >
            View
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ListingCard;