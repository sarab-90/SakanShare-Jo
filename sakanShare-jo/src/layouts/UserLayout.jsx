import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/ui/Navbar.jsx";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const UserLayout = () => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      {/* GLOBAL NAVBAR */}
      <Navbar user={user} />

      {/* PAGE CONTENT */}
      <Box sx={{ px: 2, py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;