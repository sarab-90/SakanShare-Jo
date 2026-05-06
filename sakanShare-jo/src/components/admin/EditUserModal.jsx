import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Stack, MenuItem, Box, Divider
} from "@mui/material";

const EditUserModal = ({ open, user, mode, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    is_active: true,
    password: "", // حقل إضافي للإضافة
  });

  useEffect(() => {
    if (user && mode === "edit") {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        is_active: user.is_active ?? true,
        password: "", 
      });
    } else {
      // تصفير الحقول في حالة الإضافة
      setForm({
        name: "", email: "", phone: "", role: "user",
        is_active: true, password: ""
      });
    }
  }, [user, mode, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));
  };

  const handleSubmit = () => {
    // التعديل الجوهري: إذا كان إضافة، لا نشترط وجود userid
    if (mode === "edit") {
      onSave(user.userid, form.name, form.email, form.phone, form.role, form.is_active);
    } else {
      // في حالة الإضافة، نرسل البيانات كاملة مع الباسورد
      onSave(null, form.name, form.email, form.phone, form.role, form.is_active, form.password);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" 
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
        {mode === "add" ? "Create New User" : "Edit User Profile"}
      </DialogTitle>
      
      <Divider />

      <DialogContent sx={{ mt: 1 }}>
        <Stack spacing={2.5}>
          <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          
          <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} fullWidth />

          {/* حقل الباسورد يظهر فقط عند إضافة مستخدم جديد */}
          {mode === "add" && (
            <TextField 
              label="Password" name="password" type="password" 
              value={form.password} onChange={handleChange} fullWidth 
            />
          )}

          <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} fullWidth />

          <Stack direction="row" spacing={2}>
            <TextField select label="Role" name="role" value={form.role} onChange={handleChange} fullWidth>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="landlord">Landlord</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <TextField select label="Status" name="is_active" value={String(form.is_active)} onChange={handleChange} fullWidth>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          </Stack>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} variant="outlined" color="inherit">Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} sx={{ px: 4 }}>
              {mode === "add" ? "Create User" : "Save Changes"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;