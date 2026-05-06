import React from "react";
import { Box, Container, Typography, Divider, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0F172A", color: "#FFFFFF", pt: 6, pb: 4 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={4}>
          <Box>
            <Typography variant="h6" fontWeight={900}>Sakan<span style={{ color: "#6366F1" }}>Share</span></Typography>
            <Typography variant="body2" sx={{ color: "#94A3B8", mt: 1 }}>Making co-living accessible for everyone.</Typography>
          </Box>
          <Stack direction="row" spacing={3}>
            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#6366F1" } }}>Privacy</Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#6366F1" } }}>Terms</Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#6366F1" } }}>Support</Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 4, bgcolor: "#1E293B" }} />
        <Typography variant="body2" textAlign="center" sx={{ color: "#64748B" }}>
          © {new Date().getFullYear()} SakanShare Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;