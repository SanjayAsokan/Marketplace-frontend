import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) 
        return;

      try {
        const res = await axios.get(
          "https://ecommerce-backend-v6q2.onrender.com/api/orders/my-orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-6 text-gray-400">Loading orders...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[90vh]">
      <h2 className="text-3xl font-bold mb-8 text-center text-white"> My Orders</h2>
      
      {orders.length === 0 ? (<p className="text-center text-gray-400">No paid orders yet.</p>
      ) : (<div className="space-y-6">
        {orders.map((order) => (<div key={order._id} className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition" >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="space-y-1">
              <p className="font-semibold text-lg"> Order ID:{" "} <span className="text-gray-300">{order._id}</span></p>
              <p className="text-gray-400 text-sm"> Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-300 font-medium"> Total: ${order.totalAmount}</p>
              <p className={`font-semibold ${order.status === "delivered" ? "text-green-400" : order.status === "pending" ? "text-yellow-400" : "text-gray-300" }`} > Status: {order.status} </p>
            </div>
            <button onClick={() => alert("Order details coming soon!")} className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition font-semibold" > View Details </button>
          </div>
          
          {/* Products */}
          <div className="mt-4 border-t border-gray-700 pt-3">
            <p className="text-sm text-gray-400 mb-1">Products:</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              {order.products.map((p) => (<li key={p.product?._id}>{p.product?.title}{" "} <span className="text-gray-400">(x{p.quantity})</span> </li>
            ))}
            </ul>
          </div>
        </div>
        ))}
      </div>
    )}
  </div>
  );
}
