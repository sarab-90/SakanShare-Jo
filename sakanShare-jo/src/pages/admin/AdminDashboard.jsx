import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  Trash2,
  Search,
  TrendingUp,
  Users,
  Home,
  Settings,
  LayoutDashboard,
  DollarSign,
  Download,
} from "lucide-react";
import { UserContext } from "../../context/AuthContext.jsx";
import { ListingContext } from "../../context/ListingContext.jsx";
import { PreferencesContext } from "../../context/PreferencesContext.jsx";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899"];

const AdminDashboard = () => {
  const { users = [], allUsers, deleteUser } = useContext(UserContext);
  const { listings = [], getListings } = useContext(ListingContext);
  const { preferencesStats, getPreferencesStats } =
    useContext(PreferencesContext);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    allUsers?.();
    getListings?.();
    getPreferencesStats?.();
  }, []);

  const safeUsers = Array.isArray(users) ? users : [];
  const safeListings = Array.isArray(listings) ? listings : [];

  const roleData = [
    { name: "Users", value: safeUsers.filter((u) => u.role === "user").length },
    {
      name: "Admins",
      value: safeUsers.filter((u) => u.role === "admin").length,
    },
    {
      name: "Landlords",
      value: safeUsers.filter((u) => u.role === "landlord").length,
    },
  ];

  const filteredUsers = safeUsers.filter(
    (u) =>
      u?.name?.toLowerCase().includes(search.toLowerCase()) ||
      u?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const StatsCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            sx={{
              color: "#64748B",
              fontWeight: 600,
              fontSize: "0.875rem",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1E293B" }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{ bgcolor: `${color}15`, color: color, p: 1.5, borderRadius: 3 }}
        >
          <Icon size={24} />
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
        <TrendingUp size={16} color="#10B981" />
        <Typography sx={{ color: "#64748B", fontSize: "0.75rem" }}>
          {subtitle}
        </Typography>
      </Stack>
    </Paper>
  );
// Export Reports
  const exportToCSV = () => {
    const headers = ["User ID, Name, Email, Role, Created At\n"];

    const rows = safeUsers
      .map(
        (u) => `${u.userid}, ${u.name}, ${u.email}, ${u.role}, ${u.created_at}`,
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "sakan_share_users.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: "#1E293B", letterSpacing: "-1px" }}
            >
              Overview Dashboard
            </Typography>
            <Typography sx={{ color: "#64748B", mt: 1 }}>
              Welcome back, Sarab. Here is what's happening with Sakan Share
              today.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Download size={18} />}
            onClick={exportToCSV} 
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              bgcolor: "#1B262C",
              "&:hover": { bgcolor: "#2C3E50" },
            }}
          >
            Export Reports
          </Button>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Users"
              value={safeUsers.length}
              subtitle="Live accounts"
              icon={Users}
              color="#6366F1"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Listings"
              value={safeListings.length}
              subtitle="Verified properties"
              icon={Home}
              color="#10B981"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Matches Found"
              value={preferencesStats?.total || 0}
              subtitle="Based on preferences"
              icon={Settings}
              color="#F59E0B"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Avg. Budget"
              value={`${Math.round(preferencesStats?.avgBudget || 0)} JOD`}
              subtitle="Per month"
              icon={DollarSign}
              color="#EC4899"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* User Management Table */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 5, border: "1px solid #E2E8F0" }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  User Management
                </Typography>
                <TextField
                  size="small"
                  placeholder="Search name or email..."
                  InputProps={{
                    startAdornment: (
                      <Search
                        size={18}
                        style={{ color: "#94A3B8", marginRight: "8px" }}
                      />
                    ),
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    width: 300,
                    "& .MuiOutlinedInput-root": { borderRadius: 4 },
                  }}
                />
              </Stack>

              <Box sx={{ minHeight: "400px" }}>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((u) => (
                    <Box
                      key={u.userid}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 2.5,
                        borderBottom: "1px solid #F1F5F9",
                        "&:last-child": { borderBottom: 0 },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "#6366F1",
                            width: 45,
                            height: 45,
                            fontWeight: 700,
                          }}
                        >
                          {u.name ? u.name[0].toUpperCase() : "U"}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#1E293B",
                            }}
                          >
                            {u.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.85rem", color: "#64748B" }}
                          >
                            {u.email}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={4} alignItems="center">
                        <Badge
                          badgeContent={u.role?.toUpperCase()}
                          color={u.role === "admin" ? "secondary" : "primary"}
                          sx={{
                            "& .MuiBadge-badge": {
                              borderRadius: 2,
                              px: 1.5,
                              py: 1.2,
                              fontWeight: 700,
                              position: "static",
                              transform: "none",
                            },
                          }}
                        />
                        <IconButton
                          color="error"
                          onClick={() => deleteUser(u.userid)}
                          sx={{
                            bgcolor: "#FEF2F2",
                            "&:hover": { bgcolor: "#FEE2E2" },
                          }}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Stack>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{ textAlign: "center", py: 10, color: "#94A3B8" }}
                  >
                    No users found.
                  </Typography>
                )}
              </Box>

              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button
                  disabled={page === 1}
                  variant="outlined"
                  sx={{ borderRadius: 3 }}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={page * perPage >= filteredUsers.length}
                  variant="contained"
                  sx={{ borderRadius: 3, bgcolor: "#1B262C" }}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                border: "1px solid #E2E8F0",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>
                Role Distribution
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                    >
                      {roleData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                          cornerRadius={10}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack spacing={2} sx={{ mt: 4 }}>
                {roleData.map((entry, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          bgcolor: COLORS[index],
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#64748B",
                          fontWeight: 500,
                        }}
                      >
                        {entry.name}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontWeight: 700 }}>
                      {entry.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
