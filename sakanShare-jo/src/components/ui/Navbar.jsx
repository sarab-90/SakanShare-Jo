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
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  Dashboard as DashboardIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About us", path: "/about/us" }, // تم تعديل المسار ليتناسب مع المشروع
  ];

  const linkStyle = {
    color: "#1E293B", // لون أعمق وأوضح (Slate 800)
    fontWeight: 700,
    borderRadius: 2,
    textTransform: "none",
    fontSize: "0.95rem",
    "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" },
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(16px)", // تعميق تأثير الشفافية
          background: "rgba(255,255,255,0.9)", // خلفية بيضاء بوضوح أكثر
          borderBottom: "1px solid #CBD5E1", // خط سفلي أعمق
          color: "#1B262C",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", height: 90 }}> {/* زيادة الارتفاع لـ 85 */}
            {/* Logo */}
            <Typography
              variant="h5"
              fontWeight="900"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#1B262C",
                letterSpacing: "-1.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Sakan<span style={{ color: "#6366F1" }}>Share</span>
            </Typography>

              <Link to="/profile/11">Go to Profile 11</Link>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  component={Link}
                  to={link.path}
                  sx={linkStyle}
                >
                  {link.title}
                </Button>
              ))}

              {user?.role === "user" && (
                <Button
                  component={Link}
                  to="/user/home"
                  sx={{
                    ...linkStyle,
                    color: "#6366F1",
                    bgcolor: "rgba(99,102,241,0.08)",
                    px: 2,
                    ml: 1,
                    "&:hover": { bgcolor: "rgba(99,102,241,0.15)" },
                  }}
                >
                  Browse Spaces
                </Button>
              )}
            </Stack>

            {/* Auth Actions & Profile */}
            <Box>
              {!user ? (
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <Button
                    component={Link}
                    to="/login"
                    sx={{ ...linkStyle, color: "#1B262C" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    disableElevation
                    sx={{
                      bgcolor: "#6366F1",
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontWeight: 800,
                      px: 3,
                      "&:hover": { bgcolor: "#4F46E5" },
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1}>
                  {user.role === "admin" && (
                    <Button
                      component={Link}
                      to="/admin"
                      sx={{
                        ...linkStyle,
                        color: "#6366F1",
                        display: { xs: "none", sm: "flex" },
                      }}
                      startIcon={<DashboardIcon sx={{ fontSize: 20 }} />}
                    >
                      Admin Panel
                    </Button>
                  )}
                  {user.role === "landlord" && (
                    <Button
                      component={Link}
                      to="/landlord/dashboard"
                      sx={{
                        ...linkStyle,
                        color: "#6366F1",
                        display: { xs: "none", sm: "flex" },
                      }}
                      startIcon={<DashboardIcon sx={{ fontSize: 20 }} />}
                    >
                      Dashboard
                    </Button>
                  )}

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      mx: 1,
                      height: 24,
                      alignSelf: "center",
                      display: { xs: "none", sm: "block" },
                    }}
                  />

                  {/* Profile Button */}
                  <Button
                    onClick={handleMenuOpen}
                    endIcon={<KeyboardArrowDown sx={{ color: "#94A3B8" }} />}
                    sx={{
                      textTransform: "none",
                      color: "#1B262C",
                      borderRadius: 3,
                      pl: 0.5,
                      pr: 1,
                      py: 0.5,
                      "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        bgcolor: "#6366F1",
                        mr: { sm: 1 },
                        fontSize: 14,
                        fontWeight: 800,
                        boxShadow: "0 2px 4px rgba(99,102,241,0.2)",
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      sx={{
                        display: { xs: "none", sm: "block" },
                        color: "#1B262C",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Button>

                  {/* Profile Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.08))",
                        borderRadius: 4,
                        border: "1px solid #F1F5F9",
                        p: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        if (user.role === "admin") {
                          navigate("/admin/profile");
                        } else if (user.role === "landlord") {
                          navigate("/landlord/profile");
                        } else {
                          navigate("/user/profile"); 
                        }
                      }}
                      sx={{ borderRadius: 2, mb: 0.5, py: 1 }}
                    >
                      <ListItemIcon>
                        <AccountCircle
                          fontSize="small"
                          sx={{ color: "#6366F1" }}
                        />
                      </ListItemIcon>
                      <Typography variant="body2" fontWeight={600}>
                        Profile Settings
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        borderRadius: 2,
                        color: "#EF4444",
                        py: 1,
                        "&:hover": { bgcolor: "#FEF2F2" },
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "#EF4444" }} />
                      </ListItemIcon>
                      <Typography variant="body2" fontWeight={700}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Stack>
              )}

              {/* Mobile Menu Icon */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: "flex", md: "none" }, color: "#1B262C" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 280, p: 3 }}>
          <Typography variant="h6" fontWeight="900" mb={3} color="#1B262C">
            Sakan<span style={{ color: "#6366F1" }}>Share</span>
          </Typography>
          <Stack spacing={1}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                fullWidth
                sx={{ ...linkStyle, justifyContent: "flex-start" }}
              >
                {link.title}
              </Button>
            ))}
            <Divider sx={{ my: 2 }} />
            {!user ? (
              <Stack spacing={1.5}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize:50
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  disableElevation
                  fullWidth
                  sx={{
                    bgcolor: "#6366F1",
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize:50
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Button
                  component={Link}
                  to="/profile"
                  fullWidth
                  sx={{ ...linkStyle, justifyContent: "flex-start" }}
                  startIcon={<AccountCircle />}
                >
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  fullWidth
                  sx={{
                    ...linkStyle,
                    justifyContent: "flex-start",
                    color: "#EF4444",
                  }}
                  startIcon={<Logout />}
                >
                  Logout
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}