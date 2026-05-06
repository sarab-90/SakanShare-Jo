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
  DashboardRounded,
  HomeWorkRounded,
  PeopleAltRounded,
  ReceiptLongRounded,
  AnalyticsRounded,
} from "@mui/icons-material";

const DRAWER_WIDTH = 280;

const menuItems = [
  { label: "Dashboard", icon: <DashboardRounded />, path: "/admin" },
  { label: "Listings", icon: <HomeWorkRounded />, path: "/admin/listings" },
  { label: "Users", icon: <PeopleAltRounded />, path: "/admin/users" },
  { label: "Requests", icon: <ReceiptLongRounded />, path: "/admin/requests" },
  { label: "Analytics", icon: <AnalyticsRounded />, path: "/admin/analytics" },
];

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100vh",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #F1F5F9",
        p: 3,
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        // إضافة ظل ناعم جداً جهة اليمين كما في التصاميم الحديثة
        boxShadow: "4px 0 24px rgba(0,0,0,0.02)",
      }}
    >
      {/* LOGO AREA */}
      <Box sx={{ px: 1, mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "#0F172A",
          }}
        >
          Sakan<span style={{ color: "#6366F1" }}>Share</span>
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#94A3B8", fontWeight: 500 }}>
          Admin Management Suite
        </Typography>
      </Box>

      {/* MENU LIST */}
      <List sx={{ flexGrow: 1 }}>
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
                    borderRadius: "16px", // حواف دائرية أكثر كما في الصورة
                    py: 1.5,
                    px: 2,
                    transition: "all 0.2s ease",
                    bgcolor: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                    color: isActive ? "#6366F1" : "#64748B",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(99,102,241,0.12)" : "#F8FAFC",
                      transform: "translateX(4px)", // حركة بسيطة عند التمرير
                    },
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      color: isActive ? "#6366F1" : "#94A3B8",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#6366F1",
                      }}
                    />
                  )}
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>

      {/* FOOTER AREA IN SIDEBAR */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#F8FAFC",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>
          System Version 2.0.4
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminSidebar;