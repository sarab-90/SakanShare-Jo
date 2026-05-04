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
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            Listings Management
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Manage all housing listings
          </Typography>
        </Box>

        <Chip
          label={`${listings.length} Listings`}
          color="secondary"
          sx={{
            fontWeight: 700,
            px: 1,
          }}
        />
      </Box>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          bgcolor: "background.paper",
        }}
      >
        <TableContainer>
          <Table>
            {/* TABLE HEAD */}
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#F8FAFC",
                }}
              >
                {[
                  "Image",
                  "Title",
                  "City",
                  "Price",
                  "Occupants",
                  "Availability",
                  "Created",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 800,
                      color: "text.secondary",
                      fontSize: 13,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {listings?.map((listing) => (
                <TableRow
                  key={listing.listing_id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      bgcolor: "#F8FAFC",
                    },
                  }}
                >
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
                        borderRadius: 3,
                      }}
                    />
                  </TableCell>

                  {/* TITLE */}
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      {listing.title}
                    </Typography>
                  </TableCell>

                  {/* CITY */}
                  <TableCell
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {listing.city}
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "secondary.main",
                      }}
                    >
                      {listing.price} {listing.currency}
                    </Typography>
                  </TableCell>

                  {/* OCCUPANTS */}
                  <TableCell>
                    <Chip
                      label={`${listing.current_occupants} / ${listing.max_occupants}`}
                      size="small"
                      sx={{
                        bgcolor: "#EEF2FF",
                        color: "#4338CA",
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  {/* AVAILABILITY */}
                  <TableCell>
                    <Chip
                      label={
                        listing.is_available
                          ? "Available"
                          : "Unavailable"
                      }
                      size="small"
                      color={
                        listing.is_available
                          ? "success"
                          : "error"
                      }
                      sx={{
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  {/* CREATED */}
                  <TableCell
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {new Date(
                      listing.created_at,
                    ).toLocaleDateString()}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
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
                    sx={{
                      py: 6,
                      color: "text.secondary",
                    }}
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