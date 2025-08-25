import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-v6q2.onrender.com/api/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  const addToCart = () => {
    if (!product) return;
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

  if (!product)
    return (
      <p className="p-6 text-center text-gray-400">Loading...</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-[90vh]">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-gray-800 text-white shadow-lg rounded-2xl p-8">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-gray-700 rounded-xl overflow-hidden h-96">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
            <p className="text-yellow-400 text-xl font-semibold mb-4">
              Price: {product.price} {product.currency}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              {product.description || "No description available."}
            </p>
          </div>

          <button
            onClick={addToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
