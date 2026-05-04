import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";
import toast from "react-hot-toast";

const mockUsers = [
  { id: 1, name: "Ahmad", city: "Amman", budget: 250, role: "tenant" },
  { id: 2, name: "Sara", city: "Amman", budget: 300, role: "tenant" },
  { id: 3, name: "Omar", city: "Irbid", budget: 200, role: "tenant" },
  { id: 4, name: "Lina", city: "Amman", budget: 220, role: "tenant" },
];

const Matches = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();

  const [matches, setMatches] = useState([]);
  const [requests, setRequests] = useState([]);

  // 🔥 ADDED: loading state
  const [loadingId, setLoadingId] = useState(null);

  const calculateScore = (u, me) => {
    let score = 0;

    if (u.city === me.city) score += 40;

    const budgetDiff = Math.abs(u.budget - me.budget);
    if (budgetDiff <= 50) score += 30;
    else if (budgetDiff <= 100) score += 15;

    if (u.role === me.role) score += 30;

    return score;
  };

  useEffect(() => {
    if (!user) return;

    const enriched = mockUsers
      .filter((u) => u.id !== user.id)
      .map((u) => ({
        ...u,
        score: calculateScore(u, user),
      }))
      .sort((a, b) => b.score - a.score);

    setMatches(enriched);
  }, [user]);

  const sendRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.post("/match-requests", {
        receiver_id: id,
        message: "",
      });

      setRequests((prev) => [...prev, id]);

      toast.success("Request sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending request");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 5, px: 2 }}>

      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Matches
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          People most compatible with your profile
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {matches.map((u) => (
          <Grid item xs={12} md={4} key={u.id}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 4,
                background: theme.palette.background.paper,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              {/* NAME */}
              <Typography fontWeight={800} fontSize={18}>
                {u.name}
              </Typography>

              {/* CHIPS */}
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label={u.city} size="small" color="primary" variant="outlined" />
                <Chip label={`$${u.budget}`} size="small" color="success" variant="outlined" />
                <Chip label={u.role} size="small" color="secondary" variant="outlined" />
              </Box>

              {/* SCORE */}
              <Box sx={{ mt: 2 }}>
                <Typography fontSize={13} fontWeight={600}>
                  Match Score: {u.score}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={u.score}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[300],
                    "& .MuiLinearProgress-bar": {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                    },
                  }}
                />
              </Box>

              {/* BUTTON */}
              <Button
                fullWidth
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  background: requests.includes(u.id)
                    ? theme.palette.grey[300]
                    : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                  color: requests.includes(u.id)
                    ? theme.palette.text.secondary
                    : "#fff",
                }}
                onClick={() => sendRequest(u.id)}
                disabled={requests.includes(u.id) || loadingId === u.id}
              >
                {loadingId === u.id
                  ? "Sending..."
                  : requests.includes(u.id)
                  ? "Request Sent"
                  : "Send Request"}
              </Button>

            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Matches;