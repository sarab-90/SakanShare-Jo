import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar.jsx";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";

export default function MainLayout() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar  user={user} />
      <Outlet />
    </>
  );
}
