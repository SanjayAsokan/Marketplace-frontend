// src/pages/Dashboard/user/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${productId}`)
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

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      {product.images?.length > 0 && (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full max-w-md h-auto object-cover mb-4"
        />
      )}
      <p className="text-gray-700 mb-2">Price: {product.price} {product.currency}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
