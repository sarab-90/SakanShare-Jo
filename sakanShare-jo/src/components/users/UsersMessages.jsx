import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import {
  EmailRounded,
  MarkEmailReadRounded,
  DeleteOutlineRounded,
  ReplyRounded,
  ScheduleRounded,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";

import { UserContext } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";

const UsersMessages = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyMessages = async () => {
    try {
      const adminId = 15; 
      const res = await api.get(`/getChat/${adminId}`);
      const chatData = res.data.messages || res.data.chatHistory || [];
      setMessages(chatData);
    } catch (err) {
      console.error("API Fetch Error:", err.response?.status || err.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMessages();
  }, []);

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/${messageId}`);
        setMessages((prev) => prev.filter((msg) => (msg.message_id || msg.userid) !== messageId));
      } catch (err) {
        console.error("Delete Error:", err.message);
        alert("Failed to delete the message.");
      }
    }
  };
  const handleReply = (msg) => {
    console.log("Replying to message:", msg.message_id);
    alert(`Replying to: ${msg.message_text.substring(0, 30)}...`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#6366F1" }} size={50} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center", gap: 2.5 }}>
        <Avatar
          sx={{
            bgcolor: "rgba(99, 102, 241, 0.08)",
            color: "#6366F1",
            width: 64,
            height: 64,
          }}
        >
          <EmailRounded sx={{ fontSize: 35 }} />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#1B262C" }}>
            Inbox
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748B", fontWeight: 500 }}>
            Manage your conversations with SakanShare support.
          </Typography>
        </Box>
      </Box>

      <Stack spacing={3}>
        {messages.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 5,
              bgcolor: "#F8FAFC",
              border: "2px dashed #E2E8F0",
            }}
          >
            <MarkEmailReadRounded sx={{ fontSize: 60, color: "#CBD5E1", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#475569", fontWeight: 800 }}>
              No Messages Found
            </Typography>
            <Typography variant="body2" sx={{ color: "#94A3B8", mt: 1 }}>
              Your inbox is clear. Support updates will appear here.
            </Typography>
          </Paper>
        ) : (
          messages.map((msg) => (
            <Paper
              key={msg.message_id || Math.random()}
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: 4,
                border: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(30, 41, 59, 0.06)",
                  borderColor: "#6366F1",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#1B262C", width: 48, height: 48 }}>
                    <AdminPanelSettingsRounded />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#1B262C" }}>
                      {msg.sender_name || "Support Team"}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <ScheduleRounded sx={{ fontSize: 14, color: "#94A3B8" }} />
                      <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                        {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Recently"}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Chip
                  label="Official"
                  size="small"
                  sx={{ bgcolor: "rgba(99, 102, 241, 0.1)", color: "#6366F1", fontWeight: 800 }}
                />
              </Stack>

              <Box sx={{ pl: { xs: 0, sm: 8.5 } }}>
                <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.8, fontWeight: 500 }}>
                  {msg.message_text}
                </Typography>

                <Divider sx={{ my: 3, borderStyle: "dashed" }} />

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDelete(msg.message_id || msg.userid)} 
                      sx={{ color: "#F43F5E" }}
                    >
                      <DeleteOutlineRounded />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    startIcon={<ReplyRounded />}
                    onClick={() => handleReply(msg)}
                    sx={{
                      bgcolor: "#6366F1",
                      borderRadius: 2.5,
                      textTransform: "none",
                      px: 3,
                      "&:hover": { bgcolor: "#4F46E5" }
                    }}
                  >
                    Reply
                  </Button>
                </Stack>
              </Box>
            </Paper>
          ))
        )}
      </Stack>
    </Container>
  );
};
export default UsersMessages;