import React from "react";

import { NavLink } from "react-router-dom";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  HomeWork,
  People,
  ReceiptLong,
  Analytics,
} from "@mui/icons-material";

const DRAWER_WIDTH = 280;

const menuItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/admin",
  },

  {
    label: "Listings",
    icon: <HomeWork />,
    path: "/admin/listings",
  },

  {
    label: "Users",
    icon: <People />,
    path: "/admin/users",
  },

  {
    label: "Requests",
    icon: <ReceiptLong />,
    path: "/admin/requests",
  },

  {
    label: "Analytics",
    icon: <Analytics />,
    path: "/admin/analytics",
  },
];

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        minHeight: "100vh",
        borderRight: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        p: 2,
        position: "sticky",
        top: 0,
      }}
    >
      {/* LOGO */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          mb: 3,
          px: 1,
          color: "#0F172A",
        }}
      >
        Sakan
        <span style={{ color: "#6366F1" }}>Share</span>
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* MENU */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <NavLink
              to={item.path}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: "12px",
                    py: 1.3,

                    bgcolor: isActive
                      ? "rgba(99,102,241,0.10)"
                      : "transparent",

                    color: isActive ? "#6366F1" : "#64748B",

                    "&:hover": {
                      bgcolor: "rgba(99,102,241,0.08)",
                    },
                  }}
                >
                  <Box sx={{ mr: 1.5 }}>{item.icon}</Box>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;