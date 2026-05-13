import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  CircularProgress,
  TextField,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";
import { Users, Clock, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { RequestContext } from "../../context/RequestContext.jsx";
import api from "../../services/api.js";

const statusConfig = {
  pending: { label: "Pending", bgcolor: "#fff7ed", color: "#c2410c" },
  viewed: { label: "Viewed", bgcolor: "#eff6ff", color: "#1d4ed8" },
  accepted: { label: "Accepted", bgcolor: "#f0fdf4", color: "#15803d" },
  rejected: { label: "Rejected", bgcolor: "#fef2f2", color: "#b91c1c" },
};

const RequestsManagement = () => {
  const {
    requests,
    loading,
    getAllRequests,
    acceptRequest,
    rejectRequest,
    markAsViewed,
  } = useContext(RequestContext);

  const [statusFilter, setStatusFilter] = useState("all");
  const [roleRequests, setRoleRequests] = useState([]);

  useEffect(() => {
    getAllRequests();
    fetchRoleRequests();
  }, []);

  const stats = useMemo(
    () => ({
      total: requests?.length || 0,
      pending: requests?.filter((r) => r.status === "pending").length || 0,
      accepted: requests?.filter((r) => r.status === "accepted").length || 0,
    }),
    [requests]
  );
  const filteredRequests = (requests || []).filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  const handleAction = async (fn, id, msg) => {
    const t = toast.loading("Updating...");
    try {
      await fn(id);
      toast.success(msg, { id: t });
      getAllRequests();
    } catch {
      toast.error("Error", { id: t });
    }
  };

  const fetchRoleRequests = async () => {
    try {
      const res = await api.get("/role/requests");
      setRoleRequests(res.data.requests || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptRole = async (id) => {
    try {
      await api.put(`/accept/${id}`);
      
      toast.success("User is now landlord");
      fetchRoleRequests();
      await refreshUser();
    } catch {
      toast.error("Error");
    }
  };

  const handleRejectRole = async (id) => {
    try {
      await api.put(`/reject/${id}`);
      toast.success("Request rejected");
      fetchRoleRequests();
      await refreshUser();
    } catch {
      toast.error("Error");
    }
  };
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight={800}>Requests</Typography>

      <Grid container spacing={2} mb={4}>
        {[
          { label: "Total", value: stats.total, icon: <Users />, color: "#6366f1" },
          { label: "Pending", value: stats.pending, icon: <Clock />, color: "#f59e0b" },
          { label: "Accepted", value: stats.accepted, icon: <CheckCircle />, color: "#10b981" },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Paper sx={{ p: 2.5, display: "flex", gap: 2 }}>
              <Box sx={{ p: 1, bgcolor: `${item.color}10`, color: item.color }}>
                {item.icon}
              </Box>
              <Box>
                <Typography variant="caption">{item.label}</Typography>
                <Typography fontWeight={800}>{item.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FILTER */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <TextField
          select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
      </Stack>

      {/* REQUESTS */}
      <Paper>
        {loading ? (
          <Box py={10} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          filteredRequests.map((req) => {
            const status = statusConfig[req.status] || statusConfig.pending;

            return (
              <Box
                key={req.request_id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 2fr 1fr 1.5fr",
                  p: 2,
                  borderBottom: "1px solid #eee",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Avatar>{req.sender_name?.charAt(0)}</Avatar>
                  <Box>
                    <Typography fontWeight={700}>{req.sender_name}</Typography>
                    <Typography variant="caption">
                      {req.sender_phone}
                    </Typography>
                  </Box>
                </Stack>

                <Typography noWrap>{req.message}</Typography>

                <Chip
                  label={status.label}
                  sx={{ bgcolor: status.bgcolor, color: status.color }}
                />

                <Stack direction="row" spacing={1} justifyContent="flex-end">
               
                  <Button
                    onClick={() =>
                      handleAction(markAsViewed, req.request_id, "Viewed")
                    }
                    disabled={req.status !== "pending"}
                  >
                    View
                  </Button>

                  <Button
                    color="success"
                    disabled={req.status !== "pending"}
                    onClick={() =>
                      handleAction(acceptRequest, req.request_id, "Accepted")
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    color="error"
                    disabled={req.status !== "pending"}
                    onClick={() =>
                      handleAction(rejectRequest, req.request_id, "Rejected")
                    }
                  >
                    Reject
                  </Button>
                </Stack>
              </Box>
            );
          })
        )}
      </Paper>

      {/* ROLE REQUESTS */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight={800} mb={3}>
          Landlord Requests
        </Typography>

        {roleRequests.map((req) => (
          <Paper key={req.id} sx={{ p: 3, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography fontWeight={700}>{req.name}</Typography>
                <Typography>{req.email}</Typography>
                <Typography>
                  {req.phone} - {req.city}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  color="success"
                  disabled={req.status !== "pending"}
                  onClick={() => handleAcceptRole(req.id)}
                >
                  Accept
                </Button>

                <Button
                  color="error"
                  disabled={req.status !== "pending"}
                  onClick={() => handleRejectRole(req.id)}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default RequestsManagement;