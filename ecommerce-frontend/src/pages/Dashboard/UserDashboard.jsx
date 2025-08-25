import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.items || []))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-400">Loading products...</div>;
  if (products.length === 0)
    return <div className="text-center mt-10 text-gray-400">No products available</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-600 text-center">
        👋 Welcome! Browse Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <Link
            to={`/dashboard/user/product/${prod._id}`}
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
            <div className="p-4 flex flex-col justify-between h-32">
              <h3 className="font-semibold text-lg line-clamp-2">{prod.title}</h3>
              <p className="text-yellow-400 font-semibold mt-2">
                {prod.price} {prod.currency}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
