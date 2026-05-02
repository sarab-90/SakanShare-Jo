import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  Stack,
} from "@mui/material";

import {
  Menu,
  Home,
  Apartment,
  Groups,
  Dashboard,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/", icon: <Home fontSize="small" /> },
    { title: "Spaces", path: "/spaces", icon: <Apartment fontSize="small" /> },
    {
      title: "Roommates",
      path: "/roommates",
      icon: <Groups fontSize="small" />,
    },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.75)",
          borderBottom: "1px solid rgba(226,232,240,0.7)",
          color: "#1B262C",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* LOGO */}
            <Typography
              variant="h5"
              fontWeight="800"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#1B262C",
                letterSpacing: "-1px",
              }}
            >
              SakanShare
            </Typography>
              <Link to="/listings">Listing page</Link>


              <Link to="/create-listing">Create Listings</Link>
            
              <Link to="/ListingCard">Listing Card</Link>

            {/* DESKTOP LINKS */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  component={Link}
                  to={link.path}
                  startIcon={link.icon}
                  sx={{
                    color: "#475569",
                    fontWeight: 600,
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    textTransform: "none",

                    "&:hover": {
                      backgroundColor: "#EEF2FF",
                      color: "#6366F1",
                    },
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Stack>

            {/* RIGHT SIDE */}
            <Stack direction="row" spacing={2}>
              {/* DESKTOP AUTH */}
              {!user ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: "#1B262C",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      bgcolor: "#6366F1",
                      borderRadius: 3,
                      px: 3,
                      textTransform: "none",
                      fontWeight: "bold",

                      "&:hover": {
                        bgcolor: "#4F46E5",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <Button
                    component={Link}
                    to={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : user.role === "landlord"
                        ? "/landlord/dashboard"
                        : "/user/home"
                    }
                    startIcon={<Dashboard />}
                    sx={{
                      color: "#1B262C",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Dashboard
                  </Button>

                  <Button
                    onClick={logout}
                    sx={{
                      color: "#EF4444",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              )}

              {/* MOBILE MENU */}
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#1B262C",
                }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            height: "100%",
            background:
              "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",
            p: 3,
          }}
        >
          <Typography variant="h5" fontWeight="800" mb={4}>
            SakanShare
          </Typography>

          <Stack spacing={2}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                startIcon={link.icon}
                onClick={() => setOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  color: "#1B262C",
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor: "#E0E7FF",
                  },
                }}
              >
                {link.title}
              </Button>
            ))}

            <Box sx={{ pt: 2 }}>
              {!user ? (
                <Stack spacing={2}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    onClick={() => setOpen(false)}
                    sx={{
                      bgcolor: "#6366F1",
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Button
                    component={Link}
                    to="/user/home"
                    variant="contained"
                    onClick={() => setOpen(false)}
                    sx={{
                      bgcolor: "#6366F1",
                      borderRadius: 3,
                      textTransform: "none",
                    }}
                  >
                    Dashboard
                  </Button>

                  <Button
                    onClick={logout}
                    sx={{
                      color: "#EF4444",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}