import React, { useContext } from "react";
import { Box, Typography, Grid, Paper, Button, Stack } from "@mui/material";
import { Add, HomeWork, Message } from "@mui/icons-material";
import { UserContext } from "../../context/AuthContext.jsx";

const LandlordDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ p: 4, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={900}>My Properties</Typography>
          <Typography color="text.secondary">Manage your listings and requests</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: "#6366F1" }}>
          Add New Space
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, minHeight: 400 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Current Listings</Typography>
            {/* هنا يتم عمل Map للعقارات الخاصة بـ Landlord من قاعدة البيانات */}
            <Box sx={{ textAlign: "center", py: 10 }}>
              <HomeWork sx={{ fontSize: 60, color: "#CBD5E1" }} />
              <Typography color="text.secondary" sx={{ mt: 2 }}>No active listings found.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent Messages</Typography>
            <Stack spacing={2}>
               {/* هنا تظهر رسائل المستأجرين المهتمين */}
               <Typography variant="body2" color="text.secondary">You have no unread messages.</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandlordDashboard;