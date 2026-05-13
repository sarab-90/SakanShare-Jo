import { useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import { UserContext } from "../../context/AuthContext.jsx";

export default function OwnerOnboarding() {
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    message: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (!form.phone || !form.city) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      setLoading(true);
      await api.post("/role/request", {
        message: form.message || "I want to become a landlord",
        phone: form.phone,
        city: form.city,
      });
      toast.success("Request sent to admin successfully");
      setForm({ message: "", phone: "", city: "" });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        return;
      }
      toast.error(err.response?.data?.message || "Error sending request");
    } finally {
      setLoading(false);
    }
  };
  if (user?.role === "landlord") {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
          <Typography variant="h6" fontWeight={700}>
            You are already a landlord
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight={800} mb={1}>
          Become a Property Owner
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Send a request to admin to activate your landlord account
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Message (optional)"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            }}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
