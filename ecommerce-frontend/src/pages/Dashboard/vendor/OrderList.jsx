import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating order", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg mt-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">Placed Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-300 text-center">No paid orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-700/80 text-white">
              <tr>
                <th className="p-3 border border-gray-600">Order ID</th>
                <th className="p-3 border border-gray-600">User</th>
                <th className="p-3 border border-gray-600">Products</th>
                <th className="p-3 border border-gray-600">Total</th>
                <th className="p-3 border border-gray-600">Status</th>
                <th className="p-3 border border-gray-600">Payment</th>
                <th className="p-3 border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="bg-gray-900/70 text-white hover:bg-gray-900/90 transition">
                  <td className="p-3 border border-gray-600">{o._id}</td>
                  <td className="p-3 border border-gray-600">{o.user?.name}</td>
                  <td className="p-3 border border-gray-600">
                    {o.products.map((p) => (
                      <div key={p.product?._id}>
                        {p.product?.title} (x{p.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border border-gray-600">{o.totalAmount}</td>
                  <td className="p-3 border border-gray-600">{o.status}</td>
                  <td className="p-3 border border-gray-600">{o.paymentStatus}</td>
                  <td className="p-3 border border-gray-600">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
