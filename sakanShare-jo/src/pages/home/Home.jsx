import React from "react";
import { Box, Container, Typography, Button, Grid, Stack, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Explore, GroupAdd, VerifiedUser } from "@mui/icons-material";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#FFFFFF" }}>
      {/* HERO SECTION */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)", 
        py: { xs: 8, md: 15 },
        borderBottom: "1px solid #E2E8F0"
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.5rem", md: "4rem" }, color: "#0F172A", lineHeight: 1.1 }}>
                Find Your <span style={{ color: "#6366F1" }}>Perfect</span> Match.
              </Typography>
              <Typography sx={{ mt: 3, mb: 4, fontSize: "1.2rem", color: "#64748B", maxWidth: "500px" }}>
                The first platform in the region dedicated to smart co-living and roommate matching. Safe, verified, and community-driven.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button component={Link} to="/register" variant="contained" size="large" sx={{ bgcolor: "#6366F1", px: 4, py: 1.5, borderRadius: 2, fontWeight: "bold" }}>
                  Join Now
                </Button>
                <Button component={Link} to="/about/us" variant="outlined" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: "bold" }}>
                  How it works
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box component="img" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                sx={{ width: '100%', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {[
            { title: "Smart Matching", desc: "Our algorithm finds roommates based on your lifestyle and habits.", icon: <GroupAdd color="primary" /> },
            { title: "Verified Spaces", desc: "Every listing is reviewed by our team to ensure your safety.", icon: <VerifiedUser color="primary" /> },
            { title: "Seamless Search", desc: "Filter by budget, city, and roommate preferences easily.", icon: <Explore color="primary" /> }
          ].map((feature, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #E2E8F0", textAlign: "center", transition: "0.3s", "&:hover": { borderColor: "#6366F1", transform: "translateY(-5px)" } }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={800}>{feature.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;