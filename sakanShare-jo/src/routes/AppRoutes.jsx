import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
// Layouts
import AdminLayout from "../layouts/AdminLayout.jsx";
import LandlordLayout from "../layouts/LandlordLayout.jsx";
import UserLayout from "../layouts/UserLayout.jsx";

// Pages
import Home from "../pages/home/Home.jsx";
import ListingsPage from "../pages/listings/ListingsPage.jsx";
import ListingDetails from "../pages/listings/ListingDetails.jsx";
import CreateListing from "../pages/listings/CreateListing.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import LandlordDashboard from "../pages/landlord/LandlordDashboard.jsx";
import UserHome from "../pages/user/UserHome.jsx";

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
import MyRequests from "../pages/user/MyRequests.jsx";
import OnboardingGuard from "../components/auth/OnboardingGuard.jsx";
import UserPreferences from "../pages/user/UserPreferences.jsx";
import Analytics from "../pages/admin/Analytics.jsx";
import Profile from "../pages/admin/Profile.jsx";
import LandLordProfile from "../pages/landlord/LandLordProfile.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import AboutUs from "../pages/aboutUs/AboutUs.jsx";
import PublicProfile from "../pages/profile/PublicProfile.jsx";
import Explore from "../pages/listings/Explore.jsx";
import Contact from "../pages/contact/Contact.jsx";
import AdminMessages from "../pages/admin/AdminMessages.jsx";
import UsersMessages from "../components/users/UsersMessages.jsx";
import OwnerOnboarding from "../pages/landlord/OwnerOnboarding.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* MAIN LAYOUT */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about/us" element={<AboutUs />} />
        <Route path="/Profile/:id" element={<PublicProfile />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/owner/onboarding" element={<OwnerOnboarding/>} />


      </Route>

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
        <Route path="/user/preferences" element={<UserPreferences />} />
        <Route path="/user/matches" element={<Matches />} />
        <Route path="/messages" element={<UsersMessages />} />
        <Route path="/user/requests" element={<MyRequests />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
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
        <Route path="/messages" element={<UsersMessages />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/landlord/profile" element={<LandLordProfile />} />
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
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/messages" element={<AdminMessages />} />

      </Route>
    </Routes>
  );
}
