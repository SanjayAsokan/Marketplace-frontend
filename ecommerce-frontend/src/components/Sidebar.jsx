import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white pt-20 h-screen fixed top-16 left-0 overflow-auto">
      <nav className="flex flex-col p-4 gap-3">
        <Link to="/dashboard/vendors" className="hover:text-yellow-400">Vendors</Link>
        <Link to="/dashboard/all-orders" className="hover:text-yellow-400">All Orders</Link>
        <Link to="/dashboard/analytics" className="hover:text-yellow-400">Analytics</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
