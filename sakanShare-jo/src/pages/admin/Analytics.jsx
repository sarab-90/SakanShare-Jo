import React, { useContext, useMemo } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from "recharts";
import { UserContext } from "../../context/AuthContext.jsx";
import { RequestContext } from "../../context/RequestContext.jsx";
import { Users, TrendingUp, Home } from "lucide-react";

const Analytics = () => {
  const { users } = useContext(UserContext);
  const { requests } = useContext(RequestContext);

  const roleData = useMemo(() => [
    { name: "Users", value: users?.filter(u => u.role === "user").length || 0 },
    { name: "Landlords", value: users?.filter(u => u.role === "landlord").length || 0 },
    { name: "Admins", value: users?.filter(u => u.role === "admin").length || 0 },
  ], [users]);

  const requestData = useMemo(() => [
    { name: "Accepted", count: requests?.filter(r => r.status === "accepted").length || 0 },
    { name: "Rejected", count: requests?.filter(r => r.status === "rejected").length || 0 },
    { name: "Pending", count: requests?.filter(r => r.status === "pending").length || 0 },
  ], [requests]);

  const COLORS = ["#6366f1", "#f59e0b", "#ef4444"];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight={800} mb={1}>Platform Analytics</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Detailed insights and platform performance</Typography>

      {/* 1. البطاقات العلوية (Summary Cards) */}
      <Grid container spacing={2}>
        {[
          { label: "Total Users", value: users?.length || 0, icon: <Users size={20}/>, color: "#6366f1" },
          { label: "Total Requests", value: requests?.length || 0, icon: <TrendingUp size={20}/>, color: "#10b981" },
          { label: "Active Listings", value: "24", icon: <Home size={20}/>, color: "#3b82f6" },
        ].map((card) => (
          <Grid item xs={12} md={4} key={card.label}>
            <Paper sx={{ p: 3, borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #f1f5f9" }}>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">{card.label}</Typography>
                <Typography variant="h4" fontWeight={800}>{card.value}</Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${card.color}15`, color: card.color, display: 'flex' }}>{card.icon}</Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 2. الرسوم البيانية مع إضافة مسافة علوية (mt: 6) لتبتعد عما فوقها */}
      <Grid container spacing={10} sx={{ mt: 4 }}> 
        {/* Requests Overview */}
        <Grid item xs={5} md={2}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9", height: 420 }}>
            <Typography variant="subtitle1" fontWeight={800} mb={3}>Requests Overview</Typography>
            <Box sx={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={requestData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* User Roles Distribution */}
        <Grid item xs={12} md={2}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9", height: 420 }}>
            <Typography variant="subtitle1" fontWeight={800} mb={3}>User Roles Distribution</Typography>
            <Box sx={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                    cx="50%"
                    cy="45%"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" align="center" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;