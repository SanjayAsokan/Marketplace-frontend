import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Update quantity safely
  const updateQuantity = (productId, qty) => {
    const quantity = isNaN(qty) || qty < 1 ? 1 : qty;
    const updatedCart = cart.map((item) =>item._id === productId ? { ...item, quantity } : item);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increment = (productId) => {
    const item = cart.find((i) => i._id === productId);
    if (item) 
      updateQuantity(productId, item.quantity + 1);
  };

  const decrement = (productId) => {
    const item = cart.find((i) => i._id === productId);
    if (item) 
      updateQuantity(productId, item.quantity - 1);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
  <div className="p-6 max-w-4xl mx-auto min-h-[90vh]">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-600"> My Cart </h2>
    
    {cart.length === 0 ? (<p className="text-center text-gray-400">No items in cart.</p>) : 
    (<div className="space-y-6">
      {cart.map((item) => (
        <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition" >
          
          {/* Product Info */}
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-gray-400"> {item.price} {item.currency} </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            
            {/* Decrement */}
            <button onClick={() => decrement(item._id)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-3 py-1 rounded-lg transition" > - </button>
            
            {/* Quantity */}
            <input type="number" min="1" value={item.quantity} readOnly
              className="w-16 p-1 bg-gray-900 border border-gray-600 rounded-lg text-center text-white"/>
              
            {/* Increment */}
            <button onClick={() => increment(item._id)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-3 py-1 rounded-lg transition" > + </button>
            
            {/* Remove */}
            <button onClick={() => removeItem(item._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold transition" > Remove </button>
          </div>
        </div>
    ))}
    
    {/* Total + Checkout */}
    
    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-900 p-5 rounded-2xl shadow-md">
      <p className="font-bold text-xl text-white"> Total: ${totalAmount.toFixed(2)} </p>
      <button onClick={() => navigate("/dashboard/user/checkout")} className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition" > Proceed to Checkout </button>
    </div>
  </div>
)}
</div>
);
}
