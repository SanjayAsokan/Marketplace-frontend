// src/pages/Dashboard/user/OrderHistory.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded">
              <p>Order ID: {order._id}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.total}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
