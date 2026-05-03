import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { UserProvider } from "./context/AuthContext.jsx";
import { ListingProvider } from "./context/ListingContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme.js";

createRoot(document.getElementById("root")).render(
   <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <ListingProvider>
        <UserProvider>
          <App />
        </UserProvider>
        </ListingProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
