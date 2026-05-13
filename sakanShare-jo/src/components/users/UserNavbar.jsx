import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Tooltip,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Mail as MailIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ unreadCount = 0 }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1B262C" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          SakanShare-Jo
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Messages">
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate("/dashboard/messages")}
            >
              <Badge badgeContent={unreadCount} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar
                alt="User Name"
                src="/path-to-user-image.jpg" 
                sx={{ width: 40, height: 40, border: "2px solid #6366F1" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 200,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/dashboard/profile")}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>

          <MenuItem onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ color: "#d32f2f" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;