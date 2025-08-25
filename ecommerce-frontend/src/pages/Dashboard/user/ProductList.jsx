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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform transition hover:-translate-y-1"
          >
            {/* Product Image */}
            {prod.images?.length > 0 ? (
              <div className="w-full h-56 bg-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="object-contain h-50 w-full rounded"
                />
              </div>
            ) : (
              <div className="w-full h-56 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            {/* Product Info */}
            <div className="p-4 flex flex-col justify-between h-40">
              <h3 className="font-semibold text-lg line-clamp-2">{prod.title}</h3>
              <p className="text-yellow-400 font-semibold mt-1">
                {prod.price} {prod.currency}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(prod)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/dashboard/user/product/${prod._id}`)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition"
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
