import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>setForm({ ...form, [e.target.name]: e.target.value });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form);
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };
    return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dozntnnrc/video/upload/v1756022421/12676888_3840_2160_30fps_bhwsqt.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full border-white/30 bg-white/20 z-0"></div>

      <form onSubmit={handleSubmit} className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl w-full max-w-md p-8 sm:p-10 flex flex-col gap-4" >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Register</h2>
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
          className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition" />

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition" />

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition" />

        <select name="role" value={form.role} onChange={handleChange}
         className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition" >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded transition" > Register </button>

        <p className="text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
