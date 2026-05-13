import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Box, Typography, Grid, Paper, Button, Stack, CircularProgress,
  IconButton, Menu, MenuItem, ListItemIcon, ListItemText,
  Avatar, Card, CardContent
} from "@mui/material";
import {
  MoreVert, Edit, DeleteRounded, Add, HomeWork, 
  LocationOn, TrendingUp, Group, Visibility
} from "@mui/icons-material";
import { UserContext } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";
import AddListingForm from "../../pages/landlord/AddListingForm.jsx";
import toast from "react-hot-toast";

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #F1F5F9" }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 56, height: 56, mr: 2 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{title}</Typography>
        <Typography variant="h5" fontWeight={800}>{value}</Typography>
      </Box>
    </CardContent>
  </Card>
);

const LandlordDashboard = () => {
  const { user } = useContext(UserContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchMyData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/listings");
      const myProperties = res.data.data.filter((item) => item.owner_id === user.userid);
      setListings(myProperties);
    } catch (err) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [user.userid]);

  useEffect(() => { fetchMyData(); }, [fetchMyData]);

  const totalProperties = listings.length;
  const totalRevenue = listings.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const totalRooms = listings.reduce((sum, item) => sum + Number(item.rooms_count || 0), 0);

  const handleOpenMenu = (event, listing) => {
    setAnchorEl(event.currentTarget);
    setSelectedListing(listing);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (!selectedListing) return;
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await api.delete(`/listings/${selectedListing.listing_id}`);
        toast.success("Deleted successfully");
        fetchMyData(); 
        handleCloseMenu();
      } catch (err) {
        toast.error("Error deleting listing");
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#0F172A">My Properties Dashboard</Typography>
          <Typography color="text.secondary">Welcome, {user.name}</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => { setSelectedListing(null); setOpenModal(true); }}
          sx={{ bgcolor: "#6366F1", borderRadius: 3, fontWeight: 700, px: 3 }}
        >
          Add New Listing
        </Button>
      </Stack>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Listings" value={totalProperties} icon={<HomeWork />} color="#6366F1" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Expected Revenue" value={`${totalRevenue} JOD`} icon={<TrendingUp />} color="#EC4899" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Rooms" value={totalRooms} icon={<Group />} color="#10B981" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Views" value="Soon" icon={<Visibility />} color="#F59E0B" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 5, border: "1px solid #E2E8F0" }} elevation={0}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Active Listings</Typography>
            {loading ? (
              <Box sx={{ textAlign: "center", py: 5 }}><CircularProgress /></Box>
            ) : listings.length > 0 ? (
              <Grid container spacing={2}>
                {listings.map((listing) => (
                  <Grid item xs={12} key={listing.listing_id}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar variant="rounded" sx={{ width: 50, height: 50, bgcolor: '#F1F5F9' }}><HomeWork sx={{ color: '#6366F1' }} /></Avatar>
                        <Box>
                          <Typography fontWeight={700}>{listing.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{listing.city}, {listing.area}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Typography fontWeight={900} color="#6366F1">{listing.price} JOD</Typography>
                        <IconButton onClick={(e) => handleOpenMenu(e, listing)}><MoreVert /></IconButton>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ textAlign: 'center', py: 5 }} color="text.secondary">No properties added yet.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { setOpenModal(true); handleCloseMenu(); }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon><DeleteRounded fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <AddListingForm 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onSuccess={fetchMyData} 
        initialData={selectedListing} 
      />
    </Box>
  );
};

export default LandlordDashboard;