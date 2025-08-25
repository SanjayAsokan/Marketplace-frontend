import { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);

    try {
      await loadRazorpayScript();

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to checkout.");
        setLoading(false);
        return;
      }

      const paymentRes = await axios.post(
        "http://localhost:5000/api/payments/create",
        { products: cartItems.map(i => ({ product: i._id, quantity: i.quantity })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpayOrder, paymentId } = paymentRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount, 
        currency: razorpayOrder.currency,
        name: "My Shop (Test Mode)",
        description: "Test Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payments/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                paymentId,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Payment successful!");
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            window.location.href = "/dashboard/user/orders";
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            alert("Payment verification failed. Try again.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment creation failed:", err);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <div className="mt-4 flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? "Processing..." : "Pay with Razorpay (Test Mode)"}
          </button>
        </div>
      )}
    </div>
  );
}
