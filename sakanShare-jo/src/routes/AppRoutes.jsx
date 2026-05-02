import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import LandlordLayout from "../layouts/LandlordLayout";
import UserLayout from "../layouts/UserLayout";

// Pages
import Home from "../pages/home/Home";
import ListingsPage from "../pages/listings/ListingsPage";
import ListingDetails from "../pages/listings/ListingDetails";
import CreateListing from "../pages/listings/CreateListing";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Route>

      {/* USER */}
      <Route element={
        <ProtectedRoute allowedRoles={["user"]}>
          <UserLayout />
        </ProtectedRoute>
      }>
        <Route path="/user/home" element={<Home />} />
      </Route>

      {/* LANDLORD */}
      <Route element={
        <ProtectedRoute allowedRoles={["landlord"]}>
          <LandlordLayout />
        </ProtectedRoute>
      }>
        <Route path="/create-listing" element={<CreateListing />} />
      </Route>

      {/* ADMIN */}
      <Route element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        {/* لاحقاً */}
        {/* <Route path="/admin/dashboard" /> */}
      </Route>

    </Routes>
  );
}