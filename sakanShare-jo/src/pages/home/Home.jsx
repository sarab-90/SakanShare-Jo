import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Grid,
} from "@mui/material";

import { Link } from "react-router-dom";

import {
  ExploreRounded,
  GroupAddRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";

import TopLandlords from "../../components/sections/TopLandlords.jsx";

const Home = () => {
  const features = [
    {
      title: "Smart Matching",
      desc: "Find roommates based on lifestyle and habits.",
      icon: <GroupAddRounded />,
    },
    {
      title: "Verified Spaces",
      desc: "Every listing is manually reviewed for safety.",
      icon: <VerifiedUserRounded />,
    },
    {
      title: "Seamless Search",
      desc: "Filter by budget and city preferences easily.",
      icon: <ExploreRounded />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#FFFFFF", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          background:
            "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 40%, #FFFFFF 100%)",
          py: { xs: 10, md: 16 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            bgcolor: "#6366F1",
            opacity: 0.08,
            borderRadius: "50%",
            top: -120,
            left: -120,
            filter: "blur(50px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            bgcolor: "#8B5CF6",
            opacity: 0.08,
            borderRadius: "50%",
            bottom: 0,
            right: -80,
            filter: "blur(60px)",
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.7rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  color: "#0F172A",
                  mb: 3,
                }}
              >
                Find Your{" "}
                <Box component="span" sx={{ color: "#6366F1" }}>
                  Perfect
                </Box>
                <br />
                Roommate Match.
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                  mb: 5,
                  maxWidth: "580px",
                }}
              >
                The first platform in Jordan dedicated to smart co-living and
                roommate matching. Safe, verified, and community-driven.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 5 }}
              >
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: "#111827",
                    px: 5,
                    py: 2,
                    borderRadius: 4,
                    fontWeight: 800,
                    fontSize: "1rem",
                    boxShadow: "0 10px 25px rgba(99,102,241,0.25)",
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "#6366F1",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  Join Now
                </Button>

                <Button
                  component={Link}
                  to="/about/us"
                  variant="outlined"
                  sx={{
                    px: 5,
                    py: 2,
                    borderRadius: 4,
                    fontWeight: 800,
                    fontSize: "1rem",
                    borderColor: "#CBD5E1",
                    color: "#111827",
                    bgcolor: "#FFFFFF",
                    "&:hover": {
                      borderColor: "#6366F1",
                      color: "#6366F1",
                    },
                  }}
                >
                  How it works
                </Button>
              </Stack>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1666689466428-070319dce7ec?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  sx={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 30px 70px rgba(0,0,0,0.15)",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= OWNER CTA (NEW CLEAN STYLE) ================= */}
      <Container maxWidth="lg" sx={{ mt: -5, mb: 12 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "100px",
            background:
              "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #111827 100%)",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,

            border: "1px solid rgba(255,255,255,0.08)",

            boxShadow: "0 30px 80px rgba(15,23,42,0.35)",
          }}
        >
          {/* subtle glow */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(99,102,241,0.25)",
              filter: "blur(80px)",
              top: -120,
              right: -120,
            }}
          />

          <Box sx={{ zIndex: 2 }}>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                mb: 1,
              }}
            >
              Own a Property?
            </Typography>

            <Typography
              sx={{
                color: "#CBD5E1",
                lineHeight: 1.9,
                maxWidth: "600px",
                fontSize: "1.05rem",
              }}
            >
              List your apartment or shared space and connect with verified
              tenants across Jordan in a trusted environment.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/owner/onboarding"
            sx={{
              bgcolor: "#FFFFFF",
              color: "#0F172A",
              px: 5,
              py: 2,
              borderRadius: "16px",
              fontWeight: 800,
              whiteSpace: "nowrap",
              zIndex: 2,

              "&:hover": {
                bgcolor: "#E2E8F0",
              },
            }}
          >
            List Your Property
          </Button>
        </Paper>
      </Container>

      {/* ================= FEATURES (NEW STYLE) ================= */}
      <Container maxWidth="lg" sx={{ pb: 14 }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: "2.6rem",
            mb: 1,
            color: "#0F172A",
          }}
        >
          Why Choose Us
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#64748B",
            mb: 8,
          }}
        >
          Simple, safe and built for modern shared living
        </Typography>

        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "#6366F1",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "14px",
                    bgcolor: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    color: "#6366F1",
                  }}
                >
                  {React.cloneElement(f.icon, { sx: { fontSize: 28 } })}
                </Box>

                <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
                  {f.title}
                </Typography>

                <Typography sx={{ color: "#64748B", lineHeight: 1.8 }}>
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= LANDLORDS ================= */}
      <Box sx={{ bgcolor: "#F8FAFC", py: 12 }}>
        <TopLandlords />
      </Box>
    </Box>
  );
};

export default Home;
