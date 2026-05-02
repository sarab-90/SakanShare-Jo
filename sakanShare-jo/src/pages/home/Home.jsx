// import React from 'react';
// import { 
//   Box, Container, Typography, Button, Grid, Card, CardMedia, 
//   CardContent, Chip, Stack, InputBase, Paper, IconButton 
// } from '@mui/material';
// import { Search, Tune, FavoriteBorder, Room, FlashOn } from '@mui/icons-material';

// const Home = () => {
//   return (
//     <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      
//       {/* 1. Hero Section */}
//       <Box sx={{ pt: 10, pb: 8, textAlign: 'center', background: 'linear-gradient(to bottom, #fff, #f8fafc)' }}>
//         <Container maxWidth="md">
//           <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}>
//             Find Your People. <br />
//             <Box component="span" color="secondary.main">Match Your Lifestyle.</Box>
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
//             منصة اجتماعية تربطك بأشخاص متوافقين معك في العادات والمساحات السكنية المريحة.
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button variant="contained" color="secondary" size="large" sx={{ px: 4 }}>
//               Get Started
//             </Button>
//             <Button variant="outlined" color="primary" size="large" sx={{ px: 4 }}>
//               Learn More
//             </Button>
//           </Stack>
//         </Container>
//       </Box>

//       {/* 2. Smart Search Bar */}
//       <Container sx={{ mt: -4, mb: 8 }}>
//         <Paper 
//           elevation={0} 
//           sx={{ 
//             p: 1, display: 'flex', alignItems: 'center', 
//             borderRadius: 4, border: '1px solid #e2e8f0',
//             boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
//           }}
//         >
//           <IconButton sx={{ p: '10px' }}><Search /></IconButton>
//           <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search location, university, or neighborhood..." />
//           <Button startIcon={<Tune />} sx={{ color: 'text.secondary' }}>Filters</Button>
//           <Button variant="contained" color="primary" sx={{ borderRadius: 3, ml: 1 }}>Search</Button>
//         </Paper>
//       </Container>

//       {/* 3. Browse Spaces (The Grid) */}
//       <Container>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 4 }}>
//           <Box>
//             <Typography variant="h4" fontWeight="700">Browse Spaces</Typography>
//             <Typography variant="body1" color="text.secondary">أحدث الأماكن المتوفرة بناءً على تفضيلاتك</Typography>
//           </Box>
//           <Button color="secondary" fontWeight="600">View all</Button>
//         </Box>

//         <Grid container spacing={4}>
//           {[1, 2, 3].map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item}>
//               <Card sx={{ borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
//                 <IconButton 
//                   sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': {bgcolor: '#fff'} }}
//                 >
//                   <FavoriteBorder fontSize="small" />
//                 </IconButton>
//                 <CardMedia
//                   component="img"
//                   height="220"
//                   image={`https://source.unsplash.com/random/800x600?room,interior&sig=${item}`}
//                   alt="Room Image"
//                 />
//                 <CardContent sx={{ p: 3 }}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Typography variant="h6" fontWeight="700">Cozy Room in Amman</Typography>
//                     <Chip 
//                       icon={<FlashOn sx={{ fontSize: '16px !important', color: '#f59e0b' }} />} 
//                       label="95% Match" 
//                       sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#d97706', fontWeight: 700, borderRadius: 2 }}
//                     />
//                   </Stack>
//                   <Stack direction="row" spacing={1} alignItems="center" color="text.secondary" mb={2}>
//                     <Room fontSize="small" />
//                     <Typography variant="body2">Khalda, Amman</Typography>
//                   </Stack>
//                   <Typography variant="h5" color="secondary.main" fontWeight="700">
//                     $450 <Box component="span" sx={{ fontSize: '14px', color: 'text.secondary' }}>/ month</Box>
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* 4. Feature Section (Matching Logic) */}
//       <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 10, mt: 10 }}>
//         <Container>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Typography variant="h3" fontWeight="700" mb={3}>
//                 نظام المطابقة الذكي (Smart Matching)
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, fontSize: '1.1rem' }}>
//                 نحن لا نوفر لك مكاناً فحسب، بل نبحث لك عن بيئة تشبهك. نظامنا يحلل عاداتك اليومية لضمان تجربة سكن خالية من المشاكل.
//               </Typography>
//               <Button variant="contained" color="secondary" size="large">ابدأ رحلتك الآن</Button>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 5, backdropFilter: 'blur(10px)' }}>
//                 {/* هنا يمكن وضع رسم بياني أو شكل توضيحي للمطابقة */}
//                 <Typography color="white" align="center">Matching Visualization Component</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Home;
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";

import {
  FavoriteBorder,
  Room,
  TrendingUp,
  Groups,
  Search,
} from "@mui/icons-material";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      {/* TOP HERO (NEW STYLE - DARK MODERN PANEL) */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1B262C, #6366F1)",
          color: "white",
          py: 12,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h2" fontWeight="800" sx={{ mb: 2 }}>
            Live Better Together
          </Typography>

          <Typography sx={{ opacity: 0.8, mb: 4 }}>
            A smart living network that connects you with the right roommates,
            not just rooms.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6366F1",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Explore Now
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                borderRadius: 3,
                px: 4,
              }}
            >
              How it works
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* QUICK STATS (NEW IDEA) */}
      <Container sx={{ mt: -6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Groups color="primary" />
                <Box>
                  <Typography fontWeight="700">12,000+</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TrendingUp color="primary" />
                <Box>
                  <Typography fontWeight="700">95%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Match Accuracy
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Room color="primary" />
                <Box>
                  <Typography fontWeight="700">3,500+</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Rooms
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* SEARCH (CENTER FLOATING STYLE) */}
      <Container sx={{ mt: 6 }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Search />
          <Typography color="text.secondary" flex={1}>
            Search rooms, cities, roommates...
          </Typography>

          <Button
            variant="contained"
            sx={{ bgcolor: "#6366F1", borderRadius: 3 }}
          >
            Search
          </Button>
        </Paper>
      </Container>

      {/* FEATURED MATCHES (NEW CARD DESIGN) */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight="700" mb={3}>
          Smart Matches For You
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Card
                sx={{
                  borderRadius: 5,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "white",
                  }}
                >
                  <FavoriteBorder />
                </IconButton>

                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/random/800x600?house&sig=${item}`}
                />

                <CardContent>
                  <Typography fontWeight="700">
                    Modern Apartment
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip
                      label="Quiet"
                      size="small"
                      sx={{ bgcolor: "#EEF2FF" }}
                    />
                    <Chip
                      label="Clean"
                      size="small"
                      sx={{ bgcolor: "#EEF2FF" }}
                    />
                  </Stack>

                  <Typography
                    sx={{ mt: 2, color: "#6366F1", fontWeight: 700 }}
                  >
                    $450 / month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FINAL CTA SECTION */}
      <Box sx={{ mt: 10, py: 10, bgcolor: "#1B262C", color: "white" }}>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="700">
            Ready to find your perfect match?
          </Typography>

          <Typography sx={{ opacity: 0.7, mt: 2, mb: 4 }}>
            Join thousands of users finding better living experiences.
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#6366F1",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
}