import React, { useContext, useEffect, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, Stack, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, InputAdornment, IconButton, Tooltip, Avatar
} from "@mui/material";
import { Search, Edit2, Trash2, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import { UserContext } from "../../context/AuthContext.jsx";
import EditUserModal from "../../components/admin/EditUserModal.jsx";
import api from "../../services/api.js";

const UsersManagement = () => {
  const { users, allUsers, deleteUser } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [mode, setMode] = useState("edit"); 

  useEffect(() => {
    allUsers();
  }, []);

  const filtered = (users || []).filter((u) =>
    u?.name?.toLowerCase().includes(search.toLowerCase()) ||
    u?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedUser(null);
    setEditOpen(true);
  };

  const handleOpenEdit = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleSave = async (id, name, email, phone, role, is_active, password) => {
  const loadingToast = toast.loading(mode === "add" ? "Registering new user..." : "Updating user...");
  
  try {
    if (mode === "add") {
      await api.post("/auth/register", { 
        name, 
        email, 
        phone, 
        password: password || "DefaultPassword123", 
        role 
      });
      toast.success("User registered successfully!", { id: loadingToast });
    } else {
      await api.put(`/users/${id}`, { name, email, phone, role, is_active });
      toast.success("User updated successfully!", { id: loadingToast });
    }
    
    setEditOpen(false);
    await allUsers(); 
  } catch (err) {
    console.error("Save Error:", err);
    const errorMsg = err.response?.data?.message || "Operation failed";
    toast.error(errorMsg, { id: loadingToast });
  }
};

  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={800} color="primary.main">Users Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage platform members</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<UserPlus size={18}/>} 
          onClick={handleOpenAdd}
          sx={{ borderRadius: 2 }}
        >
          Add New User
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search size={20} /></InputAdornment>,
        }}
        sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3, bgcolor: "white" } }}
      />

      <Paper sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid #f1f5f9" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
                <TableCell sx={{ fontWeight: 700 }}>User Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, pr: 4 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.userid} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.light", fontSize: 14 }}>{u.name?.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>{u.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{u.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={u.role} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{u.is_active ? "Active" : "Inactive"}</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => handleOpenEdit(u)} color="primary"><Edit2 size={18} /></IconButton>
                      <IconButton onClick={() => deleteUser(u.userid)} color="error"><Trash2 size={18} /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {editOpen && (
        <EditUserModal
          open={editOpen}
          user={selectedUser}
          mode={mode}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};
export default UsersManagement;