import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md border-b-4 border-purple-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard/user"
          className="text-2xl font-bold hover:text-purple-400 transition"
        >
          User Dashboard
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/user/products"
            className="hover:text-purple-400 transition font-medium"
          >
            Products
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="hover:text-purple-400 transition font-medium"
          >
            Order History
          </Link>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer hover:text-purple-400 transition"
            onClick={() => navigate("/dashboard/user/cart")}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2 py-0.5 shadow-md">
                {cartCount}
              </span>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
