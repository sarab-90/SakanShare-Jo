import React, { useContext } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>
          Welcome {user?.name || "User"} 
        </Typography>

        <Typography color="text.secondary">
          Find your perfect roommate or explore matches tailored for you
        </Typography>
      </Box>

      {/* ONBOARDING SUGGESTION (NON-BLOCKING) */}
      {user && user.onboardingCompleted === false && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#fff8e1",
          }}
        >
          <Typography fontWeight={700}>
            Improve your matches
          </Typography>

          <Typography fontSize={13} color="text.secondary" sx={{ mt: 0.5 }}>
            Complete your profile to get more accurate roommate suggestions.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/onboarding")}
          >
            Complete Setup
          </Button>
        </Paper>
      )}

      {/* QUICK ACTIONS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700}>Complete Preferences</Typography>

            <Typography fontSize={13} color="text.secondary" sx={{ mt: 1 }}>
              Set your lifestyle, budget, and matching criteria
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/user/preferences")}
            >
              Start Setup
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700}>View Matches</Typography>

            <Typography fontSize={13} color="text.secondary" sx={{ mt: 1 }}>
              See users compatible with your preferences
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate("/user/matches")}
            >
              Explore
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700}>My Requests</Typography>

            <Typography fontSize={13} color="text.secondary" sx={{ mt: 1 }}>
              Track your roommate requests status
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate("/user/requests")}
            >
              Open
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* FUTURE SECTION */}
      <Box sx={{ mt: 5 }}>
        <Typography fontWeight={800} sx={{ mb: 2 }}>
          Suggested for you
        </Typography>

        <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            Matching system will appear here (based on preferences)
          </Typography>
        </Paper>
      </Box>

    </Box>
  );
};

export default UserHome;