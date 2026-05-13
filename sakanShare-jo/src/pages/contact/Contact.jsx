import React, { useState } from "react";
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Stack, useTheme, Fade, Grid, IconButton , Avatar
} from "@mui/material";
import { 
  SendRounded, PhoneEnabledRounded, 
  EmailRounded, LocationOnRounded,
  Instagram, Facebook, LinkedIn
} from "@mui/icons-material";
import api from "../../services/api.js"; 
import toast, { Toaster } from "react-hot-toast"; 

const Contact = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message_text: "",
  });

  const ADMIN_ID = 15; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Sending your message...");

    try {
      const formattedMessage = `Subject: ${formData.subject}\n\n${formData.message_text}`;
      
      const response = await api.post("/send", {
        receiver_id: ADMIN_ID,
        message_text: formattedMessage,
        listing_id: null,
        conversation_id: null 
      });
      if (response.data.success) {
        toast.success("Message sent successfully!", { id: loadingToast });
        setFormData({ subject: "", message_text: "" });
      }
    } catch (error) {
      toast.error("Failed to send message.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: { xs: 5, md: 12 } }}>
      <Toaster position="top-center" />
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)", borderRadius: "32px", overflow: "hidden" }}>
          
          <Grid item xs={12} md={5} sx={{ bgcolor: theme.palette.primary.main, p: { xs: 4, md: 8 }, color: "white" }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h4" fontWeight={900} gutterBottom>Contact Information</Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  Have questions? We're here to help you .
                </Typography>
              </Box>

              <Stack spacing={3} sx={{ mt: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.1)" }}><PhoneEnabledRounded /></Avatar>
                  <Typography variant="body1">+962 7000 0000</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.1)" }}><EmailRounded /></Avatar>
                  <Typography variant="body1">sarab@sakanshare.com</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.1)" }}><LocationOnRounded /></Avatar>
                  <Typography variant="body1">Irbid, Jordan</Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 5 }}>
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}><Facebook /></IconButton>
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}><Instagram /></IconButton>
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}><LinkedIn /></IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={10} sx={{ bgcolor: "white", p: { xs: 12, md: 8 } }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Typography variant="h4" fontWeight={900} color="text.primary">Send a Message</Typography>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>Subject</Typography>
                  <TextField 
                    fullWidth 
                    name="subject" 
                    placeholder="What is this about?"
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>Message</Typography>
                  <TextField 
                    fullWidth 
                    name="message_text" 
                    multiline 
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message_text} 
                    onChange={handleChange} 
                    required 
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                </Box>

                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  disabled={loading}
                  endIcon={!loading && <SendRounded />}
                  sx={{ 
                    py: 2, 
                    borderRadius: "12px", 
                    fontSize: "1rem", 
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)"
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Stack>
            </form>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;