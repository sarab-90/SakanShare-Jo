import { useState, useContext } from "react";
import { UserContext } from "../../context/AuthContext.jsx";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function Login() {
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await login(form);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        background:
          "linear-gradient(120deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "linear-gradient(135deg, #1B262C, #6366F1)",
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome Back
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.9, textAlign: "center" }}>
          Login to continue your journey and find your perfect roommate
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            width: 420,
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 20px 60px rgba(30, 41, 59, 0.08)",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Login
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter your credentials to access your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
              />

              <Button
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #6366F1, #1B262C)",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}