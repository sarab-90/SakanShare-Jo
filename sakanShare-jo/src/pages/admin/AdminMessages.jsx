import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Stack, Avatar, 
  Divider, List, ListItemButton, Chip, useTheme,
  Skeleton, IconButton, Tooltip, Button, TextField
} from "@mui/material";
import { 
  EmailRounded, MarkEmailReadRounded, 
  DeleteOutlineRounded, ReplyRounded 
} from "@mui/icons-material";
import api from "../../services/api.js";
import { toast } from "react-hot-toast"; 

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState(""); 

  const fetchMessages = async () => {
    try {
      const response = await api.get("/admin/inbox");
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        setMessages(data);
        if (data.length > 0) setSelectedMessage(data[0]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/${id}`); 
      toast.success("Message deleted");
      const updatedMessages = messages.filter(m => (m.message_id || m.id) !== id);
      setMessages(updatedMessages);
      setSelectedMessage(updatedMessages[0] || null);
    } catch (error) {
      toast.error("Failed to delete");
    }
  };
const handleReply = async () => {
  if (!replyText.trim()) return;

  const payload = {
    receiver_id: Number(selectedMessage.sender_id), 
    message_text: replyText,
    listing_id: selectedMessage.listing_id || null,
    conversation_id: selectedMessage.conversation_id || null
  };

  try {
    await api.post("/send", payload);
    console.log("Reply sent!");
    toast.success("Reply sent successfully!");
    setReplyText(""); 
  } catch (error) {
    console.error("Error sending message:", error.response?.data);
    toast.error("Failed to send reply. Please try again.");
  }
};

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, height: "calc(100vh - 120px)" }}>
      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
         <Box sx={{ bgcolor: "#6366F1", p: 1, borderRadius: 2, color: "white" }}><EmailRounded /></Box>
         <Typography variant="h5" fontWeight={800}>Admin Inbox</Typography>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ height: "100%" }}>
        <Paper sx={{ width: 350, borderRadius: "20px", overflow: "hidden", border: "1px solid #F1F5F9" }}>
          <List sx={{ overflowY: "auto", height: "100%" }}>
            {loading ? <Skeleton variant="rectangular" height="100%" /> : 
              messages.map((msg) => (
                <ListItemButton 
                  key={msg.message_id || msg.id}
                  selected={selectedMessage?.message_id === msg.message_id}
                  onClick={() => setSelectedMessage(msg)}
                  sx={{ borderBottom: "1px solid #F8FAFC", py: 2 }}
                >
                  <Stack width="100%">
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" fontWeight={700} color="#6366F1">
                        {msg.sender_name || `User #${msg.sender_id}`}
                      </Typography>
                      <Typography variant="caption" color="#94A3B8">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={700} noWrap>{msg.message_text}</Typography>
                  </Stack>
                </ListItemButton>
              ))
            }
          </List>
        </Paper>

        <Paper sx={{ flexGrow: 1, borderRadius: "20px", p: 4, border: "1px solid #F1F5F9", display: "flex", flexDirection: "column" }}>
          {selectedMessage ? (
            <>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ bgcolor: "#6366F1" }}>{selectedMessage.sender_name?.charAt(0) || "U"}</Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={800}>{selectedMessage.sender_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedMessage.sender_email}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(selectedMessage.message_id || selectedMessage.id)}>
                      <DeleteOutlineRounded />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ flexGrow: 1, bgcolor: "#F8FAFC", p: 2, borderRadius: 2, mb: 3 }}>
                <Typography variant="body1">{selectedMessage.message_text}</Typography>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder={`Reply to ${selectedMessage.sender_name}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  startIcon={<ReplyRounded />}
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
                >
                  Send Reply
                </Button>
              </Box>
            </>
          ) : (
            <Typography>Select a message to display</Typography>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default AdminMessages;