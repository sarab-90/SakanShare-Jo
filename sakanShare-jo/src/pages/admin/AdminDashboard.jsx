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
} from "@mui/material";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { UserContext } from "../../context/AuthContext.jsx";
import { ListingContext } from "../../context/ListingContext.jsx";
import { PreferencesContext } from "../../context/PreferencesContext.jsx";

const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

const AdminDashboard = () => {
  const { users, allUsers, deleteUser } = useContext(UserContext);
  const context = useContext(ListingContext);

  const { listings = [], getListings } = useContext(ListingContext);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { preferencesStats, getPreferencesStats } =
    useContext(PreferencesContext);

  const perPage = 5;

  useEffect(() => {
    allUsers();
    getListings();
    getPreferencesStats();
  }, []);

  // SAFE DATA (IMPORTANT)
  const safeUsers = Array.isArray(users) ? users : [];
  const safeListings = Array.isArray(listings) ? listings : [];

  // FILTER USERS
  const filteredUsers = safeUsers.filter((u) =>
    u?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  // ROLE STATS
  const roleData = [
    {
      name: "Users",
      value: safeUsers.filter((u) => u.role === "user").length,
    },
    {
      name: "Admins",
      value: safeUsers.filter((u) => u.role === "admin").length,
    },
    {
      name: "Landlords",
      value: safeUsers.filter((u) => u.role === "landlord").length,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* HEADER */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Admin Dashboard
          </Typography>

          <Typography sx={{ color: "#64748B" }}>
            Real-time system overview
          </Typography>
        </Box>

        {/* STATS */}
        <Grid container spacing={3}>
          <Grid xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Users</Typography>
              <Typography variant="h4">{safeUsers.length}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Listings</Typography>
              <Typography variant="h4">{safeListings.length}</Typography>
            </Paper>
          </Grid>
     
        {/* PREFERENCES STATS */}
        
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Preferences</Typography>
              <Typography variant="h4">
                {preferencesStats?.total || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Avg Budget</Typography>
              <Typography variant="h4">
                {Math.round(preferencesStats?.avgBudget || 0)}
              </Typography>
            </Paper>
          </Grid>
           </Grid>

        {/* CHART */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={6} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>
                Users Roles
              </Typography>

              <ResponsiveContainer width={400} height={350}>
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {roleData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* USERS */}
          <Grid item xs={6} md={6} >
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 15 }}>
                Users Management
              </Typography>
                    
              <TextField
                fullWidth
                placeholder="Search users..."
                onChange={(e) => setSearch(e.target.value)}
              />

              <Box sx={{ mt: 2 }}>
                {paginatedUsers.map((u) => (
                  <Box
                    key={u.id || u._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Box>
                      <Typography>{u.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: "#64748B" }}>
                        {u.role}
                      </Typography>
                    </Box>

                    <Button
                      color="error"
                      onClick={() => deleteUser(u.id || u._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Box>

              {/* PAGINATION */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Prev
                </Button>

                <Button
                  disabled={page * perPage >= filteredUsers.length}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        {/* PREFERENCES CHARTS */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* GENDER */}
          <Grid item xs={6} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>
                Gender Preference
              </Typography>

              <ResponsiveContainer width={400} height={300}>
                <PieChart>
                  <Pie
                    data={preferencesStats?.gender || []}
                    dataKey="count"
                    nameKey="gender"
                    outerRadius={80}
                  >
                    {(preferencesStats?.gender || []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* SMOKING */}
          <Grid item xs={6} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>
                Smoking Preference
              </Typography>

              <ResponsiveContainer width={400} height={300}>
                <PieChart>
                  <Pie
                    data={preferencesStats?.smoking || []}
                    dataKey="count"
                    nameKey="smoking"
                    outerRadius={80}
                  >
                    {(preferencesStats?.smoking || []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* LISTINGS */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 800, mb: 2 }}>
                Listings Management
              </Typography>

              {safeListings.map((l) => (
                <Box
                  key={l.listing_id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <Box>
                    <Typography>{l.title || l.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: "#64748B" }}>
                      {l.price}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained">
                      Approve
                    </Button>
                    <Button size="small" color="error">
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
