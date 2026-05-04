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
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { RequestContext } from "../../context/RequestContext.jsx";

/* ================= STATUS CONFIG ================= */
const statusConfig = {
  pending: {
    label: "Pending",
    color: "warning",
    icon: <HourglassTopIcon fontSize="small" />,
  },
  viewed: {
    label: "Viewed",
    color: "info",
    icon: <VisibilityIcon fontSize="small" />,
  },
  accepted: {
    label: "Accepted",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  rejected: {
    label: "Rejected",
    color: "error",
    icon: <CancelIcon fontSize="small" />,
  },
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

  useEffect(() => {
    getAllRequests();
  }, []);

  /* ================= STATS (IMPORTANT FIRST) ================= */
  const stats = useMemo(() => {
    return {
      total: requests?.length || 0,
      pending: requests?.filter((r) => r.status === "pending").length || 0,
      viewed: requests?.filter((r) => r.status === "viewed").length || 0,
      accepted: requests?.filter((r) => r.status === "accepted").length || 0,
      rejected: requests?.filter((r) => r.status === "rejected").length || 0,
    };
  }, [requests]);

  /* ================= ANALYTICS ================= */
  const analytics = [
    {
      label: "Total Requests",
      value: stats.total,
      icon: <PeopleIcon />,
      color: "primary.main",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <HourglassTopIcon />,
      color: "warning.main",
    },
    {
      label: "Viewed",
      value: stats.viewed,
      icon: <VisibilityIcon />,
      color: "info.main",
    },
    {
      label: "Accepted",
      value: stats.accepted,
      icon: <CheckCircleIcon />,
      color: "success.main",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <CancelIcon />,
      color: "error.main",
    },
  ];

  /* ================= FILTER ================= */
  const filteredRequests = useMemo(() => {
    if (!requests) return [];
    if (statusFilter === "all") return requests;
    return requests.filter((r) => r.status === statusFilter);
  }, [requests, statusFilter]);

  return (
    <Box>
      {/* HEADER */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight={800}>
          Requests Management
        </Typography>

        <Typography color="text.secondary">
          Real-time housing request control system
        </Typography>
      </Box>

      {/* ANALYTICS */}
      <Grid container spacing={2} mb={3}>
        {analytics.map((item) => (
          <Grid item xs={6} md={2.4} key={item.label}>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ color: item.color }}>{item.icon}</Box>

              <Box>
                <Typography fontSize={13} color="text.secondary">
                  {item.label}
                </Typography>

                <Typography fontWeight={800}>{item.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FILTER */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
        elevation={0}
      >
        <Typography fontWeight={700}>Filters</Typography>

        <TextField
          select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="viewed">Viewed</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
      </Paper>

      {/* LOADING */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr",
              px: 3,
              py: 2,
              bgcolor: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <Typography fontWeight={700}>Sender</Typography>
            <Typography fontWeight={700}>Message</Typography>
            <Typography fontWeight={700}>Status</Typography>
            <Typography fontWeight={700}>Date</Typography>
            <Typography fontWeight={700}>Actions</Typography>
          </Box>

          {/* BODY */}
          {filteredRequests?.length > 0 ? (
            filteredRequests.map((req) => {
              const status = statusConfig[req.status] || statusConfig.pending;

              return (
                <Box
                  key={req.request_id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr 1fr",
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #F1F5F9",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      {req.sender_name}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                      {req.sender_phone}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary">
                    {req.message}
                  </Typography>

                  <Chip
                    icon={status.icon}
                    label={status.label}
                    color={status.color}
                    size="small"
                  />

                  <Typography color="text.secondary">
                    {new Date(req.created_at).toLocaleDateString()}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      onClick={() => markAsViewed(req.request_id)}
                    >
                      View
                    </Button>

                    <Button
                      size="small"
                      color="success"
                      disabled={req.status !== "pending"}
                      onClick={() => acceptRequest(req.request_id)}
                    >
                      Accept
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      disabled={req.status !== "pending"}
                      onClick={() => rejectRequest(req.request_id)}
                    >
                      Reject
                    </Button>
                  </Stack>
                </Box>
              );
            })
          ) : (
            <Box py={6} textAlign="center">
              <Typography color="text.secondary">
                No requests found
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default RequestsManagement;