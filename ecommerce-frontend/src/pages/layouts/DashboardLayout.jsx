import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserNavbar from "../Dashboard/user/UserNavbar";

export default function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditional Navbar */}
      {user?.role === "user" ? <UserNavbar /> : <Navbar />}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
