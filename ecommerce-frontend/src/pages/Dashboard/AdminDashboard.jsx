import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const prodRes = await axios.get("/api/products");
        setProducts(prodRes.data.items || []);

        const orderRes = await axios.get("/api/orders");
        setOrders(orderRes.data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(prod => (
            <div key={prod._id} className="border rounded p-4 shadow">
              <p><strong>Title:</strong> {prod.title}</p>
              <p><strong>Price:</strong> ₹{prod.price}</p>
              <p><strong>Vendor:</strong> {prod.vendor}</p>
              <p><strong>Status:</strong> {prod.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">All Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map(order => (
          <div key={order._id} className="border rounded p-4 mb-2 shadow">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user.name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
