import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { Box } from "@mui/material";

const LandlordLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>

      <Navbar user={user}/>

      {/* CONTENT */}
      <Box sx={{ px: 2, py: 3 }}>
        <Outlet />
      </Box>
    </Box>
    )
};

export default LandlordLayout;