import React from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Stack, useTheme, Divider 
} from '@mui/material';
import { 
  AutoFixHighRounded, 
  VerifiedUserRounded, 
  Diversity1Rounded, 
  AutoGraphRounded 
} from '@mui/icons-material';

const AboutUs = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <AutoFixHighRounded sx={{ fontSize: 40 }} />,
      title: "Smart Matching",
      description: "Connect with roommates based on daily routines, budget, and social values through our smart system."
    },
    {
      icon: <VerifiedUserRounded sx={{ fontSize: 40 }} />,
      title: "Safe Community",
      description: "Security is our priority. We ensure a trustworthy environment for all students and professionals."
    },
    {
      icon: <Diversity1Rounded sx={{ fontSize: 40 }} />,
      title: "Social Harmony",
      description: "Bridge the gap between your living space and your lifestyle with like-minded individuals."
    },
    {
      icon: <AutoGraphRounded sx={{ fontSize: 40 }} />,
      title: "Future Ready",
      description: "Live in an environment that supports your academic and career goals in Jordan's top cities."
    }
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", pb: 15, pt: { xs: 8, md: 12 }, }}>
      
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          pt: 10,
          pb: 18,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="overline" 
            sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: 3, mb: 1, display: 'block' }}
          >
            ESTABLISHED 2026
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ color: "white", fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3.5rem' } }}
          >
            Finding Your Perfect <br /> 
            <Box component="span" sx={{ color: "#E0E7FF" }}>Roommate in Jordan</Box>
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: "auto" }}>
            SakanShare-Jo is a modern solution for students and professionals to find compatible shared housing.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: -6 }}> 
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  textAlign: 'center',
                  borderRadius: 5, 
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <Box sx={{ color: theme.palette.secondary.main, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 15 }}> 
          <Paper 
            sx={{ 
              borderRadius: 6, 
              overflow: 'hidden',
              boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.1)",
              border: "none",
            }}
          >
            <Grid container>
              <Grid 
                item 
                xs={12} 
                md={7} 
                sx={{ p: { xs: 5, md: 8 }, bgcolor: "white" }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: theme.palette.primary.main }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, mb: 4 }}>
                  We strive to build a community where shared living is based on mutual respect and shared interests. 
                  SakanShare-Jo is here to make your housing experience in Jordan easier, safer, and more connected.
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>2026</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>ESTABLISHED</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>AMMAN</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>HEADQUARTERS</Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid 
                item 
                xs={12} 
                md={5} 
                sx={{ 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: { xs: 200, md: 'auto' }
                }} 
              >
                <Diversity1Rounded sx={{ fontSize: 100, color: "rgba(255,255,255,0.2)" }} />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
export default AboutUs;