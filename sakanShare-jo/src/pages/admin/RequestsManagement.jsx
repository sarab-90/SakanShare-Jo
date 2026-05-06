import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box, Paper, Typography, Chip, Button, Stack, CircularProgress,
  TextField, MenuItem, Grid, Avatar
} from "@mui/material";
// سنبقي فقط الأيقونات الأساسية للبطاقات العلوية
import { Users, Clock, Eye, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { RequestContext } from "../../context/RequestContext.jsx";

const statusConfig = {
  pending:  { label: "Pending",  bgcolor: "#fff7ed", color: "#c2410c" },
  viewed:   { label: "Viewed",   bgcolor: "#eff6ff", color: "#1d4ed8" },
  accepted: { label: "Accepted", bgcolor: "#f0fdf4", color: "#15803d" },
  rejected: { label: "Rejected", bgcolor: "#fef2f2", color: "#b91c1c" },
};

const RequestsManagement = () => {
  const { requests, loading, getAllRequests, acceptRequest, rejectRequest, markAsViewed } = useContext(RequestContext);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => { getAllRequests(); }, []);

  const stats = useMemo(() => ({
    total: requests?.length || 0,
    pending: requests?.filter((r) => r.status === "pending").length || 0,
    accepted: requests?.filter((r) => r.status === "accepted").length || 0,
  }), [requests]);

  const handleAction = async (actionFn, id, successMsg) => {
    const loadingToast = toast.loading("Updating...");
    try {
      await actionFn(id);
      toast.success(successMsg, { id: loadingToast });
      getAllRequests();
    } catch (err) {
      toast.error("Error", { id: loadingToast });
    }
  };

  const filteredRequests = (requests || []).filter(r => statusFilter === "all" || r.status === statusFilter);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight={800} mb={1}>Requests</Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>Manage incoming housing applications</Typography>

      {/* Analytics - أبقيناها لأنها تعطي طابع الـ Dashboard */}
      <Grid container spacing={2} mb={4}>
        {[
          { label: "Total", value: stats.total, icon: <Users size={20} />, color: "#6366f1" },
          { label: "Pending", value: stats.pending, icon: <Clock size={20} />, color: "#f59e0b" },
          { label: "Accepted", value: stats.accepted, icon: <CheckCircle size={20} />, color: "#10b981" },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Paper sx={{ p: 2.5, borderRadius: 3, display: "flex", alignItems: "center", gap: 2, border: "1px solid #f1f5f9" }}>
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${item.color}10`, color: item.color }}>{item.icon}</Box>
              <Box>
                <Typography variant="caption" fontWeight={600} color="text.secondary">{item.label}</Typography>
                <Typography variant="h6" fontWeight={800}>{item.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Filter */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <TextField
          select size="small" value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: 150, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
        </TextField>
      </Stack>

      <Paper sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #e2e8f0" }}>
        {loading ? (
          <Box py={10} textAlign="center"><CircularProgress size={30} /></Box>
        ) : (
          <Box>
             {/* Header */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1.5fr", px: 3, py: 1.5, bgcolor: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              {["SENDER", "MESSAGE", "STATUS", "ACTIONS"].map(h => (
                <Typography key={h} variant="caption" fontWeight={800} color="text.secondary">{h}</Typography>
              ))}
            </Box>

            {/* Rows */}
            {filteredRequests.map((req) => {
              const status = statusConfig[req.status] || statusConfig.pending;
              return (
                <Box key={req.request_id} sx={{ 
                  display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1.5fr", 
                  px: 3, py: 2, borderBottom: "1px solid #f1f5f9", alignItems: "center"
                }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: "#f1f5f9", color: "#475569" }}>{req.sender_name?.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{req.sender_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.sender_phone}</Typography>
                    </Box>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" noWrap sx={{ pr: 2 }}>{req.message}</Typography>

                  <Chip label={status.label} size="small" sx={{ fontWeight: 700, fontSize: 10, bgcolor: status.bgcolor, color: status.color }} />

                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" onClick={() => handleAction(markAsViewed, req.request_id, "Viewed")} sx={{ textTransform: 'none', fontWeight: 700 }}>View</Button>
                    <Button 
                      variant="contained" size="small" disableElevation
                      disabled={req.status !== "pending"}
                      onClick={() => handleAction(acceptRequest, req.request_id, "Accepted")}
                      sx={{ textTransform: 'none', bgcolor: "#10b981", borderRadius: 1.5 }}
                    >
                      Accept
                    </Button>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RequestsManagement;