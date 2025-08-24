// src/pages/Dashboard/user/Cart.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (productId, qty) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>{item.price} {item.currency}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded"
                />
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="font-bold mt-4">Total: {totalAmount}</p>
          <button
            onClick={() => navigate("/dashboard/user/checkout")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
