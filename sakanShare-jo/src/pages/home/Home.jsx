import React from "react";
import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { ExploreRounded, GroupAddRounded, VerifiedUserRounded } from "@mui/icons-material";
import TopLandlords from "../../components/sections/TopLandlords.jsx";
const Home = () => {
  const features = [
    { title: "Smart Matching", desc: "Find roommates based on lifestyle and habits.", icon: <GroupAddRounded /> },
    { title: "Verified Spaces", desc: "Every listing is manually reviewed for safety.", icon: <VerifiedUserRounded /> },
    { title: "Seamless Search", desc: "Filter by budget and city preferences easily.", icon: <ExploreRounded /> }
  ];

  return (
    <Box sx={{ bgcolor: "#FFFFFF" }}>
      
      {/* HERO SECTION */}
      <Box sx={{ 
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)", 
        py: { xs: 10, md: 18 },
        textAlign: "center" 
      }}>
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: "2.5rem", md: "4.2rem" }, 
              color: "#0F172A", 
              lineHeight: 1.1,
              mb: 3
            }}
          >
            Find Your <span style={{ color: "#6366F1" }}>Perfect</span> <br /> 
            Roommate Match.
          </Typography>

          <Typography 
            sx={{ 
              fontSize: "1.2rem", 
              color: "#64748B", 
              mb: 5, 
              maxWidth: "650px", 
              mx: "auto", 
              lineHeight: 1.7
            }}
          >
            The first platform in Jordan dedicated to smart co-living and roommate matching. Safe, verified, and community-driven.
          </Typography>

          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center" 
            sx={{ mb: 8 }}
          >
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              sx={{ 
                bgcolor: "#1B262C", 
                px: 5, py: 2, 
                borderRadius: 3, 
                fontWeight: 800,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#6366F1" }
              }}
            >
              Join Now
            </Button>
            <Button 
              component={Link} 
              to="/about/us" 
              variant="outlined" 
              sx={{ 
                px: 5, py: 2, 
                borderRadius: 3, 
                fontWeight: 800,
                fontSize: "1rem",
                borderColor: "#E2E8F0",
                color: "#1B262C"
              }}
            >
              How it works
            </Button>
          </Stack>

          {/* بوكس الصورة في المنتصف */}
          <Box sx={{ 
            width: "100%", 
            maxWidth: "850px", 
            mx: "auto",
            position: "relative"
          }}>
            <Box 
              component="img" 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
              sx={{ 
                width: "100%", 
                borderRadius: 6, 
                boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
                display: "block"
              }} 
            />
          </Box>
        </Container>
      </Box>

      {/* FEATURES SECTION - محتوى متوسط الشاشة */}
      <Container maxWidth="lg" sx={{ pb: 15 }}>
        <Stack 
          direction={{ xs: "column", md: "row" }} 
          spacing={4} 
          justifyContent="center"
        >
          {features.map((feature, i) => (
            <Paper 
              key={i}
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 5, 
                border: "1px solid #F1F5F9", 
                textAlign: "center",
                flex: 1,
                bgcolor: "#F8FAFC",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", borderColor: "#6366F1" }
              }}
            >
              <Box sx={{ color: "#6366F1", mb: 2 }}>
                {React.cloneElement(feature.icon, { sx: { fontSize: 40 } })}
              </Box>
              <Typography variant="h6" fontWeight={900} mb={1}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
      <Box sx={{ bgcolor: "#FFFFFF", pb: 15 }}>
        <TopLandlords />
      </Box>
    </Box>
  );
};

export default Home;