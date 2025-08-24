import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    // Mock payment logic
    alert("Payment successful!");
    // Add order to localStorage or backend
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ _id: Date.now(), products: cartItems, totalAmount: cartItems.reduce((a,b)=>a+b.price*b.quantity,0), status: "pending", paymentStatus: "paid" });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    navigate("/dashboard/user/orders");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between mb-4">
              <span>{item.title} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="mt-6 flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span>${cartItems.reduce((sum,item)=>sum+item.price*item.quantity,0)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
