import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import AdminTopbar from "../components/admin/AdminTopbar.jsx";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT AREA */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* TOPBAR */}
        <AdminTopbar />

        {/* PAGE CONTENT */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
};

export default AdminLayout;