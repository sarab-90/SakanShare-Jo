import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
// Layouts
import AdminLayout from "../layouts/AdminLayout.jsx";
import LandlordLayout from "../layouts/LandlordLayout.jsx";

// Pages
import Home from "../pages/home/Home";
import ListingsPage from "../pages/listings/ListingsPage";
import ListingDetails from "../pages/listings/ListingDetails";
import CreateListing from "../pages/listings/CreateListing";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import LandlordDashboard from "../pages/landlord/LandlordDashboard.jsx";

{
  /* AUTH */
}
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* MAIN LAYOUT */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetails />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      {/* <Route element={
        <ProtectedRoute allowedRoles={["user"]}>
          <UserLayout />
        </ProtectedRoute>
      }>
        <Route path="/user/home" element={<Home />} />
      </Route> */}

      {/* LANDLORD */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["landlord"]}>
            <LandlordLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* <Route path="listings" element={<AdminListings />} /> */}
      
      </Route>
    </Routes>
  );
}
