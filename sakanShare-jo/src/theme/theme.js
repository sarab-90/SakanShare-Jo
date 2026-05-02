import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B262C", // Dark Navy (Primary)
    },

    secondary: {
      main: "#6366F1", // Indigo
    },

    background: {
      default: "#F8FAFC", // Slate 50
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E293B", // Slate 900
      secondary: "#64748B", // Slate 500
    },

    success: {
      main: "#10B981", // Emerald Green
    },

    error: {
      main: "#EF4444", // Soft Red
    },
  },

  typography: {
    fontFamily: `"Poppins", "Cairo", sans-serif`,

    h1: {
      fontWeight: 700,
      color: "#1E293B",
    },

    h2: {
      fontWeight: 700,
      color: "#1E293B",
    },

    h3: {
      fontWeight: 600,
      color: "#1E293B",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0px 6px 25px rgba(15, 23, 42, 0.08)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;