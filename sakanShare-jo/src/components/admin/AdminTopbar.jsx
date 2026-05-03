import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";

import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext.jsx";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        color: "#0F172A",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* LEFT */}
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          ADMIN PANEL
        </Typography>

        {/* RIGHT */}
        <Stack direction="row" spacing={2} alignItems="center">

          <Typography
            sx={{
              fontSize: 25,
              fontWeight:150 ,
              color: "#64748B",
            }}
          >
            {user?.name || "Admin"}
          </Typography>

          {/* AVATAR */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "#6366F1" }}>
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </Avatar>
          </IconButton>

          {/* MENU */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Settings
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;