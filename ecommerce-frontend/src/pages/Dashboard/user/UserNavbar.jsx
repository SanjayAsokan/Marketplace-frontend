// src/components/UserNavbar.jsx
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

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard/user" className="text-xl font-bold">
          User Dashboard
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard/user/products" className="hover:underline">
            Products
          </Link>
          <Link to="/dashboard/user/orders" className="hover:underline">
            Order History
          </Link>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/dashboard/user/cart")}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
