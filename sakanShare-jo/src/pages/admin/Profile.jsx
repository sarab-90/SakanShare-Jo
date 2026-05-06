import React, { useContext, useState } from "react";
import {
  Box, Paper, Typography, Avatar, Grid, Button, TextField, 
  Divider, Chip, Stack, Card, CardContent
} from "@mui/material";
import { 
  User, Mail, Phone, Shield, MapPin, Edit3, 
  Settings, Home, CheckCircle 
} from "lucide-react";
import { UserContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(UserContext); // نفترض أن بيانات المستخدم مسجلة هنا
  const [isEditing, setIsEditing] = useState(false);

  // تنسيق الألوان حسب الدور
  const getRoleTheme = (role) => {
    switch (role) {
      case "admin": return { color: "#6366f1", label: "Administrator" };
      case "landlord": return { color: "#f59e0b", label: "Property Owner" };
      default: return { color: "#10b981", label: "Verified Resident" };
    }
  };

  const theme = getRoleTheme(user?.role);

  return (
    <Box sx={{ p: 1 }}>
      {/* Header Section */}
      <Paper sx={{ 
        p: 4, borderRadius: 5, bgcolor: "white", 
        border: "1px solid #f1f5f9", mb: 4,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background Accent */}
        <Box sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, height: 100, 
          bgcolor: `${theme.color}10`, zIndex: 0 
        }} />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Avatar 
            sx={{ 
              width: 120, height: 120, fontSize: 40, bgcolor: theme.color,
              border: "4px solid white", boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
          
          <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" fontWeight={800}>{user?.name}</Typography>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }} mt={1}>
              <Chip 
                label={theme.label} 
                size="small" 
                sx={{ bgcolor: `${theme.color}15`, color: theme.color, fontWeight: 700 }}
              />
              <Chip label="Active Account" size="small" variant="outlined" color="success" icon={<CheckCircle size={14}/>} />
            </Stack>
          </Box>

          <Button 
            variant="contained" 
            startIcon={<Edit3 size={18}/>}
            onClick={() => setIsEditing(!isEditing)}
            sx={{ borderRadius: 3, bgcolor: theme.color, '&:hover': { bgcolor: theme.color } }}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {/* Left Column: Basic Info */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9" }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Personal Information</Typography>
            <Stack spacing={3}>
              <InfoRow icon={<Mail size={20}/>} label="Email Address" value={user?.email} isEditing={isEditing} />
              <InfoRow icon={<Phone size={20}/>} label="Phone Number" value={user?.phone || "Not provided"} isEditing={isEditing} />
              <InfoRow icon={<Shield size={20}/>} label="User Role" value={user?.role?.toUpperCase()} />
              <InfoRow icon={<MapPin size={20}/>} label="Location" value="Irbid, Jordan" isEditing={isEditing} />
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column: Dynamic Content based on ROLE */}
        <Grid item xs={12} md={7}>
          {user?.role === "admin" && <AdminQuickStats />}
          {user?.role === "landlord" && <LandlordOverview />}
          {user?.role === "user" && <ResidentPreferences />}
        </Grid>
      </Grid>
    </Box>
  );
};

/* --- مكونات فرعية ذكية حسب النوع --- */

const InfoRow = ({ icon, label, value, isEditing }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box sx={{ color: "text.secondary", display: 'flex' }}>{icon}</Box>
    <Box sx={{ width: '100%' }}>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>{label}</Typography>
      {isEditing ? (
        <TextField fullWidth size="small" defaultValue={value} variant="standard" sx={{ mt: -0.5 }} />
      ) : (
        <Typography variant="body1" fontWeight={600}>{value}</Typography>
      )}
    </Box>
  </Stack>
);

// للأدمن: عرض إحصائيات سريعة
const AdminQuickStats = () => (
  <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#1e293b", color: "white" }}>
    <Typography variant="h6" fontWeight={700} mb={2}>System Insights</Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box sx={{ p: 2, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
          <Typography variant="caption" color="gray">Handled Requests</Typography>
          <Typography variant="h5" fontWeight={800}>1,240</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ p: 2, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
          <Typography variant="caption" color="gray">New Users (Month)</Typography>
          <Typography variant="h5" fontWeight={800}>+85</Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

// للمؤجر: عرض ملخص العقارات
const LandlordOverview = () => (
  <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9" }}>
    <Typography variant="h6" fontWeight={700} mb={2}>Your Properties</Typography>
    <Stack spacing={2}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Home color="#f59e0b" />
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>Modern Apartment - Downtown</Typography>
            <Typography variant="caption" color="text.secondary">3 Pending Requests</Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  </Paper>
);

// للمستخدم العادي: عرض التفضيلات
const ResidentPreferences = () => (
  <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9" }}>
    <Typography variant="h6" fontWeight={700} mb={2}>Housing Preferences</Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {["Non-Smoker", "Quiet Environment", "WiFi Included", "Near University"].map(pref => (
        <Chip key={pref} label={pref} variant="outlined" sx={{ borderRadius: 2 }} />
      ))}
    </Stack>
  </Paper>
);

export default Profile;