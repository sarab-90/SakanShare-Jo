import React from "react";
import { Box, Paper, Typography, Chip, Button, LinearProgress } from "@mui/material";

const MatchCard = ({ user, onSendRequest, loading }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>

      {/* Name */}
      <Typography fontWeight={700} fontSize={18}>
        {user.name}
      </Typography>

      {/* Info */}
      <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip label={user.city} size="small" />
        <Chip label={`$${user.budget}`} size="small" />
        <Chip label={user.role} size="small" />
      </Box>

      {/* Score */}
      <Box sx={{ mt: 2 }}>
        <Typography fontSize={13}>
          Match Score: {user.score}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={user.score}
          sx={{ mt: 1, height: 6, borderRadius: 5 }}
        />
      </Box>

      {/* Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => onSendRequest(user.id)}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Request"}
      </Button>

    </Paper>
  );
};

export default MatchCard;