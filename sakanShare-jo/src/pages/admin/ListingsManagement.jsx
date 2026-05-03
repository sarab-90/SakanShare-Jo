import React, { useContext, useEffect } from "react";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { ListingContext } from "../../context/ListingContext.jsx";

const ListingsManagement = () => {
  const {
    listings = [],
    loading,
    getListings,
    deleteListing,
  } = useContext(ListingContext);

  useEffect(() => {
    getListings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "#0F172A",
          }}
        >
          Listings Management
        </Typography>

        <Typography sx={{ color: "#64748B", mt: 1 }}>
          Manage all housing listings
        </Typography>
      </Box>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #E2E8F0",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                bgcolor: "#F8FAFC",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Image</TableCell>

                <TableCell sx={{ fontWeight: 800 }}>Title</TableCell>

                <TableCell sx={{ fontWeight: 800 }}>City</TableCell>

                <TableCell sx={{ fontWeight: 800 }}>Price</TableCell>

                <TableCell sx={{ fontWeight: 800 }}>
                  Occupants
                </TableCell>

                <TableCell sx={{ fontWeight: 800 }}>
                  Availability
                </TableCell>

                <TableCell sx={{ fontWeight: 800 }}>
                  Created At
                </TableCell>

                <TableCell sx={{ fontWeight: 800 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listings?.map((listing) => (
                <TableRow key={listing.listing_id} hover>
                  {/* IMAGE */}
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={
                        listing?.images?.[0] ||
                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                      }
                      sx={{
                        width: 70,
                        height: 55,
                        borderRadius: 2,
                      }}
                    />
                  </TableCell>

                  {/* TITLE */}
                  <TableCell>
                    <Typography sx={{ fontWeight: 700 }}>
                      {listing.title}
                    </Typography>
                  </TableCell>

                  {/* CITY */}
                  <TableCell>{listing.city}</TableCell>

                  {/* PRICE */}
                  <TableCell>
                    {listing.price} {listing.currency}
                  </TableCell>

                  {/* OCCUPANTS */}
                  <TableCell>
                    {listing.current_occupants} /{" "}
                    {listing.max_occupants}
                  </TableCell>

                  {/* AVAILABILITY */}
                  <TableCell>
                    <Chip
                      label={
                        listing.is_available
                          ? "Available"
                          : "Unavailable"
                      }
                      color={
                        listing.is_available
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  {/* CREATED */}
                  <TableCell>
                    {new Date(
                      listing.created_at,
                    ).toLocaleDateString()}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        color="warning"
                        variant="contained"
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() =>
                          deleteListing(listing.listing_id)
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {/* EMPTY */}
              {listings.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    No listings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ListingsManagement;