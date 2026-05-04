import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
// Layouts
import AdminLayout from "../layouts/AdminLayout.jsx";
import LandlordLayout from "../layouts/LandlordLayout.jsx";
import UserLayout from "../layouts/UserLayout.jsx";

// Pages
import Home from "../pages/home/Home";
import ListingsPage from "../pages/listings/ListingsPage";
import ListingDetails from "../pages/listings/ListingDetails";
import CreateListing from "../pages/listings/CreateListing";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import LandlordDashboard from "../pages/landlord/LandlordDashboard.jsx";
import UserHome from "../pages/user/UserHome.jsx"

{
  /* AUTH */
}
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ListingsManagement from "../pages/admin/ListingsManagement.jsx";
import UsersManagement from "../pages/admin/UsersManagement.jsx";
import RequestsManagement from "../pages/admin/RequestsManagement.jsx";
import OnboardingWizard from "../pages/onboarding/OnboardingWizard.jsx";
import Matches from "../pages/user/Matches.jsx";



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
      <Route
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        {/* <Route path="/user/preferences" element={<UserPreferences />} /> */}
        <Route path="/user/matches" element={<Matches />} />
        {/* <Route path="/user/profile" element={<Profile />} /> */}
      </Route>

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
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/listings" element={<ListingsManagement />} />
        <Route path="/admin/requests" element={<RequestsManagement />} />
      </Route>
    </Routes>
  );
}
