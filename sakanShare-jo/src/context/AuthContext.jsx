import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // CURRENT USER
  const currentUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user || res.data.me);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    currentUser();
  }, []);
  // GET ALL USERS
  const allUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
      if (!res.data.users?.length) {
        toast.success("No users yet");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };
  // REGISTER
  const register = async (data) => {
    try {
      const { name, email, password } = data;
      if (!name || !email || !password) {
        return toast.error("All fields are required");
      }
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };
  // LOGIN
  const login = async (data) => {
    try {
      const { email, password } = data;
      if (!email || !password) {
        return toast.error("All fields are required");
      }
      const res = await api.post("/auth/login", data);
      toast.success(res.data.message || "Login successful");
      await currentUser();
      const role = res.data.user?.role;

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "user") navigate("/user/home");
      else if (role === "landlord") navigate("/landlord/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted");

      await allUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  // UPDATE PROFILE
  const updateUserProfile = async (data) => {
    try {
      const res = await api.put(`/users/${user.userid}`, data);
      toast.success(res.data.message);
      await currentUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };
  // CHANGE PASSWORD
  const changeUserPassword = async (data) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = data;

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return toast.error("Fill all fields");
      }
      if (newPassword !== confirmNewPassword) {
        return toast.error("Passwords do not match");
      }
      const res = await api.put("/auth/change-password", data);
      toast.success(res.data.message || "Password changed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        users,
        loading,
        login,
        register,
        logout,
        allUsers,
        deleteUser,
        updateUserProfile,
        changeUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
