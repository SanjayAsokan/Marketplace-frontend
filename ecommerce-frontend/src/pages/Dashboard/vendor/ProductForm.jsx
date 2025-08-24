import { useState } from "react";
import axios from "axios";

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      if (form.images) {
        for (let i = 0; i < form.images.length; i++) {
          formData.append("images", form.images[i]);
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", res.data);

      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: null,
      });

      if (onProductAdded) onProductAdded();
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition col-span-2"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
