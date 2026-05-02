import React from "react";

import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Grid,
  Paper,
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";

import {
  Dashboard,
  HomeWork,
  People,
  ReceiptLong,
  Analytics,
  Logout,
} from "@mui/icons-material";

import { Toaster, toast } from "react-hot-toast";

const DRAWER_WIDTH = 280;

const DESIGN_SYSTEM = {
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  primary: "#0F172A",
  accent: "#6366F1",
  border: "#E2E8F0",

  text: {
    main: "#1E293B",
    muted: "#64748B",
  },
};

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboard fontSize="small" />,
    active: true,
  },

  {
    label: "Listings",
    icon: <HomeWork fontSize="small" />,
  },

  {
    label: "Users",
    icon: <People fontSize="small" />,
  },

  {
    label: "Bookings",
    icon: <ReceiptLong fontSize="small" />,
  },

  {
    label: "Analytics",
    icon: <Analytics fontSize="small" />,
  },
];

const statsCards = [
  {
    label: "Monthly Growth",
    value: "+24.8%",
    color: "#10B981",
  },

  {
    label: "Active Listings",
    value: "3,842",
    color: "#0F172A",
  },

  {
    label: "Platform Users",
    value: "18,201",
    color: "#0F172A",
  },

  {
    label: "Conversion Rate",
    value: "14.2%",
    color: "#6366F1",
  },
];

const listings = [
  {
    name: "Luxury Suite 4B",
    location: "Amman, BD",
    price: "450 JOD",
    status: "Active",
  },

  {
    name: "Student Shared Apt",
    location: "Irbid, JU",
    price: "120 JOD",
    status: "Pending",
  },

  {
    name: "Modern Studio",
    location: "Amman, West",
    price: "300 JOD",
    status: "Active",
  },
];

const AdminDashboard = () => {
  const handleLogout = () => {
    toast.success("Logged out");
  };

  const handleManage = (name) => {
    toast.success(`Managing ${name}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: DESIGN_SYSTEM.bg,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      <Toaster position="top-center" />

      {/* TOPBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            sm: `calc(100% - ${DRAWER_WIDTH}px)`,
          },

          ml: {
            sm: `${DRAWER_WIDTH}px`,
          },

          bgcolor: alpha(DESIGN_SYSTEM.bg, 0.7),

          backdropFilter: "blur(12px)",

          borderBottom: `1px solid ${DESIGN_SYSTEM.border}`,

          color: DESIGN_SYSTEM.text.main,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            height: 70,
            px: {
              md: 4,
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "700",
              color: DESIGN_SYSTEM.text.muted,
              letterSpacing: 1,
            }}
          >
            ADMIN PANEL / OVERVIEW
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "700",
                color: DESIGN_SYSTEM.accent,
                cursor: "pointer",
              }}
            >
              UPDATES
            </Typography>

            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: DESIGN_SYSTEM.primary,
                fontWeight: "800",
              }}
            >
              A
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Box
        component="nav"
        sx={{
          width: {
            sm: DRAWER_WIDTH,
          },

          flexShrink: {
            sm: 0,
          },
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,

              border: "none",

              borderRight: `1px solid ${DESIGN_SYSTEM.border}`,
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              p: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* LOGO */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: DESIGN_SYSTEM.primary,
                mb: 6,
                letterSpacing: "-1px",
              }}
            >
              SAKAN
              <span
                style={{
                  color: DESIGN_SYSTEM.accent,
                }}
              >
                SHARE
              </span>
            </Typography>

            {/* MENU */}
            <List disablePadding sx={{ flexGrow: 1 }}>
              {sidebarItems.map((item) => (
                <ListItem
                  key={item.label}
                  disablePadding
                  sx={{ mb: 1 }}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: "12px",

                      py: 1.2,

                      bgcolor: item.active
                        ? alpha(DESIGN_SYSTEM.accent, 0.08)
                        : "transparent",

                      "&:hover": {
                        bgcolor: alpha(
                          DESIGN_SYSTEM.accent,
                          0.04
                        ),
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      {item.icon}

                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "14px",

                          fontWeight: item.active
                            ? "700"
                            : "500",

                          color: item.active
                            ? DESIGN_SYSTEM.accent
                            : DESIGN_SYSTEM.text.muted,
                        }}
                      />
                    </Stack>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* FOOTER */}
            <Box sx={{ mt: "auto", pt: 4 }}>
              <Divider sx={{ mb: 3 }} />

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  borderRadius: "10px",

                  textTransform: "none",

                  fontWeight: "700",

                  borderColor: DESIGN_SYSTEM.border,

                  color: DESIGN_SYSTEM.text.main,
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          p: {
            xs: 3,
            md: 5,
          },

          mt: 8,
        }}
      >
        <Container maxWidth="xl" disableGutters>
          {/* HEADER */}
          <Box
            sx={{
              mb: 6,

              display: "flex",

              justifyContent: "space-between",

              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "900",

                  color: DESIGN_SYSTEM.primary,

                  letterSpacing: "-1.5px",
                }}
              >
                System Performance
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: DESIGN_SYSTEM.text.muted,
                  mt: 0.5,
                }}
              >
                Real-time metrics for SakanShare platform.
              </Typography>
            </Box>

            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: DESIGN_SYSTEM.primary,

                borderRadius: "10px",

                textTransform: "none",

                px: 3,

                fontWeight: "700",
              }}
            >
              Generate Report
            </Button>
          </Box>

          {/* STATS */}
          <Grid container spacing={3}>
            {statsCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.label}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,

                    borderRadius: "18px",

                    border: `1px solid ${DESIGN_SYSTEM.border}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: DESIGN_SYSTEM.text.muted,

                      fontWeight: "800",

                      letterSpacing: "0.5px",
                    }}
                  >
                    {card.label.toUpperCase()}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "900",

                      color: card.color,

                      my: 1,
                    }}
                  >
                    {card.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}

            {/* TABLE */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  mt: 2,

                  borderRadius: "18px",

                  border: `1px solid ${DESIGN_SYSTEM.border}`,

                  overflow: "hidden",
                }}
              >
                {/* TABLE HEADER */}
                <Box
                  sx={{
                    px: 3,
                    py: 3,

                    borderBottom: `1px solid ${DESIGN_SYSTEM.border}`,

                    display: "flex",

                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "800",
                    }}
                  >
                    Listings Management
                  </Typography>

                  <Typography
                    sx={{
                      color: DESIGN_SYSTEM.accent,

                      fontWeight: "700",

                      fontSize: "14px",

                      cursor: "pointer",
                    }}
                  >
                    FILTERS
                  </Typography>
                </Box>

                {/* TABLE */}
                <TableContainer>
                  <Table>
                    <TableHead
                      sx={{
                        bgcolor: "#F1F5F9",
                      }}
                    >
                      <TableRow>
                        {[
                          "Property",
                          "Location",
                          "Price",
                          "Status",
                          "Action",
                        ].map((head) => (
                          <TableCell
                            key={head}
                            sx={{
                              fontWeight: "800",

                              fontSize: "12px",

                              color:
                                DESIGN_SYSTEM.text.muted,
                            }}
                          >
                            {head.toUpperCase()}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listings.map((row) => (
                        <TableRow key={row.name} hover>
                          <TableCell
                            sx={{
                              fontWeight: "700",
                            }}
                          >
                            {row.name}
                          </TableCell>

                          <TableCell
                            sx={{
                              color:
                                DESIGN_SYSTEM.text.muted,
                            }}
                          >
                            {row.location}
                          </TableCell>

                          <TableCell
                            sx={{
                              fontWeight: "800",
                            }}
                          >
                            {row.price}
                          </TableCell>

                          <TableCell>
                            <Box
                              sx={{
                                display: "inline-block",

                                px: 1.5,

                                py: 0.5,

                                borderRadius: "6px",

                                fontSize: "11px",

                                fontWeight: "900",

                                bgcolor:
                                  row.status === "Active"
                                    ? alpha(
                                        "#10B981",
                                        0.1
                                      )
                                    : alpha(
                                        "#F59E0B",
                                        0.1
                                      ),

                                color:
                                  row.status === "Active"
                                    ? "#059669"
                                    : "#D97706",
                              }}
                            >
                              {row.status.toUpperCase()}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Button
                              size="small"
                              onClick={() =>
                                handleManage(row.name)
                              }
                              sx={{
                                fontWeight: "800",
                              }}
                            >
                              MANAGE
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;