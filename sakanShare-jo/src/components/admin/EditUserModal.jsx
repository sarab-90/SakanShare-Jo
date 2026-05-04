import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const EditUserModal = ({ open, user, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        is_active: user.is_active ?? true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "is_active"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = () => {
    if (!user?.userid) return;
    onSave(user.userid, form.name, form.email, form.phone);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800 }}>
        Edit User
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Stack spacing={2.2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="landlord">Landlord</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              <TextField
                select
                label="Status"
                name="is_active"
                value={String(form.is_active)}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Stack>

            {/* ACTIONS */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>

              <Button variant="contained" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;