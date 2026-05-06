import React, { useEffect, useState, useContext } from "react";
import {
  Box, Typography, Paper, Tabs, Tab, Chip, Button, Grid, Avatar, Stack, Divider, Fade
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { 
  SendRounded, 
  CallReceivedRounded, 
  AccessTimeRounded, 
  CheckCircleRounded, 
  CancelRounded 
} from "@mui/icons-material";
import api from "../../services/api.js";
import { UserContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const MyRequests = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 تعديل المسارات لتكون مباشرة كما في الباك اند الخاص بكِ
  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        // التعديل هنا: تمت إزالة /match-requests
        const [sentRes, receivedRes] = await Promise.all([
          api.get("/sent"), 
          api.get("/received")
        ]);

        setSent(sentRes.data.data || []);
        setReceived(receivedRes.data.data || []);
      } catch (err) {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // 🔥 تحديث الحالة (Accept / Reject)
  const updateStatus = async (id, status) => {
    try {
      // التعديل هنا: المسار أصبح مباشرة بعد الـ /api/
      await api.patch(`/${id}`, { status });

      toast.success(`Request ${status} successfully`);

      // تحديث الواجهة فوراً
      setReceived((prev) =>
        prev.map((r) => (r.request_id === id ? { ...r, status } : r))
      );
    } catch (err) {
      toast.error("Error updating request");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "success";
      case "rejected": return "error";
      default: return "warning";
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", py: 6, px: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={900} sx={{ color: "#1E293B" }}>
          Manage Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your connections and pending invitations
        </Typography>
      </Box>

      <Tabs 
        value={tab} 
        onChange={(e, v) => setTab(v)} 
        sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<SendRounded fontSize="small" />} iconPosition="start" label="Sent Invitations" sx={{ fontWeight: 700 }} />
        <Tab icon={<CallReceivedRounded fontSize="small" />} iconPosition="start" label="Received Requests" sx={{ fontWeight: 700 }} />
      </Tabs>

      <Grid container spacing={3}>
        {((tab === 0 && sent.length === 0) || (tab === 1 && received.length === 0)) && !loading && (
          <Grid item xs={12}>
            <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 5, bgcolor: '#F8FAFC' }}>
              <Typography color="text.secondary">No requests found here.</Typography>
            </Paper>
          </Grid>
        )}

        {(tab === 0 ? sent : received).map((req) => (
          <Grid item xs={12} md={6} key={req.request_id}>
            <Fade in={true}>
              <Paper
                elevation={0}
                sx={{
                  p: 3, borderRadius: 4, border: "1px solid #E2E8F0",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: theme.palette.primary.light, fontWeight: 700 }}>
                      {(tab === 0 ? req.receiver_name : req.sender_name)?.[0] || "?"}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={800} color="#1E293B">
                        {tab === 0 ? req.receiver_name : req.sender_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <AccessTimeRounded sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                        {new Date(req.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip 
                    label={req.status.toUpperCase()} 
                    size="small" 
                    color={getStatusColor(req.status)} 
                    variant="soft" 
                    sx={{ fontWeight: 800, fontSize: 10 }}
                  />
                </Stack>

                <Box sx={{ mt: 2, mb: 3, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                  <Typography variant="body2" color="#475569" sx={{ fontStyle: req.message ? 'normal' : 'italic' }}>
                    "{req.message || "No message."}"
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                {tab === 1 && req.status === "pending" ? (
                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth variant="contained" color="success"
                      startIcon={<CheckCircleRounded />}
                      onClick={() => updateStatus(req.request_id, "accepted")}
                      sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                    >
                      Accept
                    </Button>
                    <Button
                      fullWidth variant="outlined" color="error"
                      startIcon={<CancelRounded />}
                      onClick={() => updateStatus(req.request_id, "rejected")}
                      sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                    >
                      Decline
                    </Button>
                  </Stack>
                ) : (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                    {req.status === "pending" ? "Waiting for response..." : `Status: ${req.status}`}
                  </Typography>
                )}
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyRequests;