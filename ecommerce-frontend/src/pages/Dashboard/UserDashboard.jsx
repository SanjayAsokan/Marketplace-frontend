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

  if (loading) return <div className="text-center mt-10">Loading products...</div>;
  if (products.length === 0) return <div className="text-center mt-10">No products available</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome! Browse Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <Link
            to={`/dashboard/user/product/${prod._id}`}
            key={prod._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {prod.images?.length > 0 && (
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{prod.title}</h3>
              <p className="text-gray-500">{prod.price} {prod.currency}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
