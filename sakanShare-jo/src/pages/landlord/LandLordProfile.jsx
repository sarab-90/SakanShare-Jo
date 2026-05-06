import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Stack,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Lock,
  Person,
  Phone,
  Email,
  HomeWork,
} from "@mui/icons-material";
import { UserContext } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";

export default function LandLordProfile() {
  const { user, updateUserProfile, changeUserPassword, loading } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    await updateUserProfile(formData);
    setIsEditing(false);
  };

  const handlePasswordChange = async (e) => {
  e.preventDefault();
  
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }
  await changeUserPassword({
    oldPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
    confirmNewPassword: passwordData.confirmPassword 
  });
  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
};

  if (loading || !user) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: "#6366F1", color: "white", mb: 4 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, bgcolor: "white", color: "#6366F1", fontSize: 40, fontWeight: "bold" }}>
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight={800}>{user.name}</Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>{user.role?.toUpperCase()} Account</Typography>
          </Grid>
          {user.role === "landlord" && (
            <Grid item>
              <Card sx={{ bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "none", color: "white" }}>
                
              </Card>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #E2E8F0" }} elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={700} display="flex" alignItems="center">
                <Person sx={{ mr: 1, color: "#6366F1" }} /> Personal Info
              </Typography>
              {!isEditing ? (
                <Button startIcon={<Edit />} onClick={() => setIsEditing(true)} size="small">Edit</Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <IconButton color="success" onClick={handleProfileUpdate}><Save /></IconButton>
                  <IconButton color="error" onClick={() => setIsEditing(false)}><Cancel /></IconButton>
                </Stack>
              )}
            </Stack>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Security / Password */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #E2E8F0" }} elevation={0}>
            <Typography variant="h6" fontWeight={700} mb={3} display="flex" alignItems="center">
              <Lock sx={{ mr: 1, color: "#6366F1" }} /> Security
            </Typography>
            <form onSubmit={handlePasswordChange}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  size="small"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  size="small"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  size="small"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
                <Button 
                  fullWidth 
                  variant="contained" 
                  type="submit"
                  sx={{ mt: 1, bgcolor: "#1B262C", borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  Update Password
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}