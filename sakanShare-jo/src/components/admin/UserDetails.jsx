import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
} from "@mui/material";

const UserDetails = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography>
            <b>Name:</b> {user.name}
          </Typography>

          <Typography>
            <b>Email:</b> {user.email}
          </Typography>

          <Typography>
            <b>Phone:</b> {user.phone || "N/A"}
          </Typography>

          <Typography>
            <b>Role:</b> {user.role}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ color: "text.secondary" }}>
            User ID: {user.userid}
          </Typography>

          <Stack direction="row" justifyContent="flex-end" mt={3}>
            <Button onClick={onClose} variant="contained">
              Close
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;