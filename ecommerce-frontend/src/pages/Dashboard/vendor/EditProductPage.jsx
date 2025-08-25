import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return null;
  if (!productData) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => navigate(-1)} 
    >
      <div
        className="bg-gray-900 p-6 rounded-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Edit Product</h2>
          <button
            className="text-white text-xl font-bold"
            onClick={() => navigate(-1)}
          >
            &times;
          </button>
        </div>
        <ProductForm
          initialData={productData}
          productId={id}
          onProductAdded={() => {
            alert("Product updated successfully!");
            navigate(-1); 
          }}
        />
      </div>
    </div>
  );
}
