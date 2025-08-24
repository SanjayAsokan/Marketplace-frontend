import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.items || []);
    } catch (err) {
      console.error("Error fetching products", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product", err.response?.data || err.message);
    }
  };

  const handleEdit = (id) => {
  navigate(`/dashboard/vendor/edit-product/${id}`);
};


  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-6 w-64 h-96 relative"
        >
          {/* Edit & Delete Buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => handleEdit(product._id)}
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>

          {/* Product Image */}
          {product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-32 h-32 rounded-full object-cover mb-4 mt-4"
            />
          )}

          {/* Product Info */}
          <h3 className="font-semibold text-center text-lg">{product.title}</h3>
          <p className="text-gray-400 text-sm text-center">{product.category}</p>
          <p className="font-bold mt-2 text-center">{product.price} {product.currency}</p>
        </div>
      ))}
    </div>
  );
}
