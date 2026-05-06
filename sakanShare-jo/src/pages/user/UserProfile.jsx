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
  InputAdornment,
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
  Badge,
  VerifiedUser,
} from "@mui/icons-material";
import { UserContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { user, updateUserProfile, changeUserPassword, loading } = useContext(UserContext);
  
  const [isEditing, setIsEditing] = useState(false);
  
  // بيانات الملف الشخصي
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // بيانات كلمة المرور
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // تعبئة البيانات عند تحميل الصفحة
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // تحديث البيانات الأساسية
  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // تغيير كلمة المرور
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    await changeUserPassword(passwordData);
    setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: "#6366F1" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        
        {/* الجزء الأيسر: بطاقة التعريف السريعة */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 5, border: "1px solid #E2E8F0" }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "#6366F1",
                    fontSize: 45,
                    fontWeight: 800,
                    mx: 'auto',
                    boxShadow: "0 10px 20px rgba(99,102,241,0.2)"
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: '#10B981', borderRadius: '50%', p: 0.5, border: '3px solid white' }}>
                  <VerifiedUser sx={{ color: 'white', fontSize: 16 }} />
                </Box>
              </Box>
              
              <Typography variant="h5" fontWeight={800} mt={2} color="#1B262C">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Box sx={{ mt: 2, display: 'inline-block', px: 2, py: 0.5, bgcolor: 'rgba(99,102,241,0.1)', color: '#6366F1', borderRadius: 2, fontWeight: 700, fontSize: '0.75rem' }}>
                {user.role?.toUpperCase()}
              </Box>
            </Paper>

            {/* إحصائيات سريعة للمالك */}
            {user.role === 'landlord' && (
              <Card elevation={0} sx={{ borderRadius: 5, bgcolor: '#1B262C', color: 'white' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                      <HomeWork />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Manage Listings</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>View and edit your properties</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>

        {/* الجزء الأيمن: النماذج */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            
            {/* بطاقة المعلومات الشخصية */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #E2E8F0" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Badge sx={{ color: '#6366F1' }} /> Personal Information
                </Typography>
                {!isEditing ? (
                  <Button 
                    variant="outlined" 
                    startIcon={<Edit />} 
                    onClick={() => setIsEditing(true)}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />} 
                      onClick={handleProfileUpdate}
                      sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, bgcolor: '#6366F1' }}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="text" 
                      color="inherit" 
                      onClick={() => setIsEditing(false)}
                      sx={{ fontWeight: 700 }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ ml: 1 }}>FULL NAME</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Person fontSize="small" /></InputAdornment> }}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ ml: 1 }}>PHONE NUMBER</Typography>
                  <TextField
                    fullWidth
                    value={formData.phone}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Phone fontSize="small" /></InputAdornment> }}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ ml: 1 }}>EMAIL ADDRESS</Typography>
                  <TextField
                    fullWidth
                    value={formData.email}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Email fontSize="small" /></InputAdornment> }}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* بطاقة تغيير كلمة المرور */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #E2E8F0" }}>
              <Typography variant="h6" fontWeight={800} mb={4} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Lock sx={{ color: '#F43F5E' }} /> Change Password
              </Typography>
              
              <form onSubmit={handlePasswordChange}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      value={passwordData.confirmNewPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      disableElevation
                      sx={{ 
                        bgcolor: '#1B262C', 
                        borderRadius: 2.5, 
                        px: 4, py: 1.2, 
                        fontWeight: 700,
                        textTransform: 'none',
                        "&:hover": { bgcolor: '#0F172A' }
                      }}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}