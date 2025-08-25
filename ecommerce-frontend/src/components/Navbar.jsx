import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
  <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md border-b-4 border-yellow-500 sticky top-0 z-50">
    <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}> MyMarketplace </div>
    
    <div className="flex items-center space-x-4">
      {!user && (
        <>
        <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
        <Link to="/signup" className="hover:text-yellow-400 transition">Register</Link>
        </>)}
        {user && (
          <>
            <span className="font-medium">Hi, {user.name}</span>
            {user.role === "admin" && <Link to="/dashboard/admin" className="hover:text-yellow-400 transition">Admin</Link>}
            {user.role === "vendor" && <Link to="/dashboard/vendor" className="hover:text-yellow-400 transition">Vendor</Link>}
            {user.role === "user" && <Link to="/dashboard/user" className="hover:text-yellow-400 transition">Dashboard</Link>}

            <button onClick={handleLogout} className="ml-3 px-3 py-1 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition" > Logout </button>
          </>
        )}
      </div>
    </nav>
  );
}
