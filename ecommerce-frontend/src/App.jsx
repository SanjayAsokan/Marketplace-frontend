import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Dashboard Layout & Pages
import DashboardLayout from "./pages/layouts/DashboardLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import VendorDashboard from "./pages/Dashboard/VendorDashboard";
import EditProductPage from "./pages/Dashboard/vendor/EditProductPage";

// User Pages
import UserDashboard from "./pages/Dashboard/UserDashboard";
import ProductList from "./pages/Dashboard/user/ProductList";
import ProductDetails from "./pages/Dashboard/user/ProductDetails";
import Cart from "./pages/Dashboard/user/Cart";
import Checkout from "./pages/Dashboard/user/Checkout";
import OrderHistory from "./pages/Dashboard/user/OrderHistory";

// Mock auth
const getUserRole = () => localStorage.getItem("role");

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Admin */}
          <Route
            path="admin"
            element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>}
          />

          {/* Vendor */}
          <Route
            path="vendor"
            element={<ProtectedRoute allowedRoles={["vendor"]}><VendorDashboard /></ProtectedRoute>}
          />
          <Route
            path="vendor/edit-product/:id"
            element={<ProtectedRoute allowedRoles={["vendor"]}><EditProductPage /></ProtectedRoute>}
          />

          {/* User */}
          <Route
            path="user"
            element={<ProtectedRoute allowedRoles={["user"]}><UserDashboard /></ProtectedRoute>}
          />
          <Route
            path="user/products"
            element={<ProtectedRoute allowedRoles={["user"]}><ProductList /></ProtectedRoute>}
          />
          <Route
            path="user/product/:productId"
            element={<ProtectedRoute allowedRoles={["user"]}><ProductDetails /></ProtectedRoute>}
          />
          <Route
            path="user/cart"
            element={<ProtectedRoute allowedRoles={["user"]}><Cart /></ProtectedRoute>}
          />
          <Route
            path="user/checkout"
            element={<ProtectedRoute allowedRoles={["user"]}><Checkout /></ProtectedRoute>}
          />
          <Route
            path="user/orders"
            element={<ProtectedRoute allowedRoles={["user"]}><OrderHistory /></ProtectedRoute>}
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
