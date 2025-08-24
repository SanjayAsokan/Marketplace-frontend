// src/pages/Dashboard/user/ProductList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.items || []))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((p) => p._id === product._id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {prod.images?.length > 0 && (
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between">
              <h3 className="font-semibold">{prod.title}</h3>
              <p className="text-gray-500">
                {prod.price} {prod.currency}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => addToCart(prod)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/user/product/${prod._id}`)
                  }
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
