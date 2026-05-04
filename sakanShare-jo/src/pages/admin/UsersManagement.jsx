import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import { UserContext } from "../../context/AuthContext.jsx";
import EditUserModal from "../../components/admin/EditUserModal.jsx";

const UsersManagement = () => {
  const { users, allUsers, deleteUser } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    allUsers();
  }, []);

  const filtered = (users || []).filter((u) =>
    u?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleSave = async (id, name, email, phone) => {
    try {
      await api.put(`/users/${id}`, {
        name,
        email,
        phone,
      });

      setEditOpen(false);
      await allUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Users Management
      </Typography>

      <TextField
        fullWidth
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            {/* HEADER */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F8FAFC" }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.userid} hover>
                  <TableCell>{u.name}</TableCell>

                  <TableCell sx={{ color: "text.secondary" }}>
                    {u.email}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={u.role}
                      size="small"
                      color={
                        u.role === "admin"
                          ? "error"
                          : u.role === "landlord"
                            ? "warning"
                            : "primary"
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={u.is_active ? "Active" : "Inactive"}
                      size="small"
                      color={u.is_active ? "success" : "default"}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() => deleteUser(u.userid)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* MODAL */}
      <EditUserModal
        open={editOpen}
        user={selectedUser}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default UsersManagement;
