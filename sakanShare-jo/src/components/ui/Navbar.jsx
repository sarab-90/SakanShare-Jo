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
} from "@mui/material";
import { Menu as MenuIcon, Logout, AccountCircle, ExpandMore, Window } from "@mui/icons-material";
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
    { title: "About us", path: "/about/us" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.8)",
          borderBottom: "1px solid #E2E8F0",
          color: "#1B262C",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              fontWeight="900"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "#1B262C", letterSpacing: "-1px" }}
            >
              Sakan<span style={{ color: "#6366F1" }}>Share</span>
            </Typography>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  component={Link}
                  to={link.path}
                  sx={{ color: "#475569", fontWeight: 700, borderRadius: 2, textTransform: "none" }}
                >
                  {link.title}
                </Button>
              ))}

              {/* BROWSE SPACES: تظهر فقط للمستخدم المسجل وتوجهه إلى منطقته الخاصة */}
              {user?.role === "user" && (
                <Button
                  component={Link}
                  to="/user/home"
                  sx={{ 
                    color: "#6366F1", 
                    fontWeight: 800, 
                    textTransform: "none",
                    bgcolor: "rgba(99,102,241,0.08)",
                    px: 2,
                    ml: 2,
                    "&:hover": { bgcolor: "rgba(99,102,241,0.15)" }
                  }}
                >
                  BROWSE SPACES
                </Button>
              )}
            </Stack>

            <Box>
              {!user ? (
                <Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
                  <Button component={Link} to="/login" sx={{ color: "#1B262C", fontWeight: 600, textTransform: "none" }}>
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{ bgcolor: "#6366F1", borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                  >
                    Sign up
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* أزرار لوحة التحكم للأدوار   */}
                  {user.role === "admin" && (
                    <Button
                      component={Link}
                      to="/admin"
                      variant="outlined"
                      sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, display: { xs: "none", sm: "flex" } }}
                    >
                      Admin Panel
                    </Button>
                  )}
                  {user.role === "landlord" && (
                    <Button
                      component={Link}
                      to="/landlord/listings"
                      variant="outlined"
                      sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, display: { xs: "none", sm: "flex" } }}
                    >
                      My Dashboard
                    </Button>
                  )}
                  <Button
                    onClick={handleMenuOpen}
                    sx={{ textTransform: "none", color: "#1B262C", borderRadius: 2 }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#6366F1", mr: 1, fontSize: 14 }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" fontWeight={700} sx={{ display: { xs: "none", sm: "block" } }}>
                      {user.name}
                    </Typography>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{ sx: { mt: 3, Width: 100, borderRadius: 8 } }}
                  >
                    <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                       Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: "#EF4444" }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </Stack>
              )}

              <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: "flex", md: "none" }, color: "#1B262C" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Typography variant="h6" fontWeight="900" mb={3}>SakanShare</Typography>
          <Stack spacing={1}>
            {navLinks.map((link) => (
              <Button key={link.title} component={Link} to={link.path} fullWidth sx={{ justifyContent: "flex-start", textTransform: "none" }}>
                {link.title}
              </Button>
            ))}
            
            {user?.role === "user" && (
              <Button 
                component={Link} 
                to="/user/home" 
                fullWidth 
                sx={{ justifyContent: "flex-start", color: "#6366F1", fontWeight: 800, bgcolor: "#F5F3FF", mt: 1 }}
              >
                BROWSE SPACES
              </Button>
            )}

            <Divider sx={{ my: 2 }} />
            
            {!user ? (
              <Stack spacing={1}>
                <Button component={Link} to="/login" variant="outlined">Login</Button>
                <Button component={Link} to="/register" variant="contained" sx={{ bgcolor: "#6366F1" }}>Sign up</Button>
              </Stack>
            ) : (
              <>
                <Button component={Link} to="/profile" fullWidth sx={{ justifyContent: "flex-start", textTransform: "none" }}>Profile</Button>
                <Button onClick={handleLogout} color="error" fullWidth sx={{ justifyContent: "flex-start", textTransform: "none" }}>Logout</Button>
              </>
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}