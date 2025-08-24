import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());       // Clear Redux state
    navigate("/");            // Redirect to landing page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Multi-Vendor Marketplace
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="font-medium">Welcome, {user.name}</span>

            {/* Role-based Dashboard Link */}
            {user.role === "admin" && (
              <Link
                to="/dashboard/admin"
                className="ml-4 hover:underline"
              >
                Admin Dashboard
              </Link>
            )}
            {user.role === "vendor" && (
              <Link
                to="/dashboard/vendor"
                className="ml-4 hover:underline"
              >
                Vendor Dashboard
              </Link>
            )}
            {user.role === "user" && (
              <Link
                to="/dashboard/user"
                className="ml-4 hover:underline"
              >
                User Dashboard
              </Link>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
