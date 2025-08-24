import { useState } from "react";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form);

    // Store role for ProtectedRoute
    localStorage.setItem("role", res.data.role);

    dispatch(loginSuccess({ token: res.data.token, user: res.data }));

    // Navigate to the correct dashboard
    if (res.data.role === "admin") navigate("/dashboard/admin", { replace: true });
    else if (res.data.role === "vendor") navigate("/dashboard/vendor", { replace: true });
    else navigate("/dashboard/user", { replace: true });

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover" >
        <source src="https://res.cloudinary.com/dozntnnrc/video/upload/v1756022421/12676888_3840_2160_30fps_bhwsqt.mp4" type="video/mp4" />
    </video>

    <div className="absolute top-0 left-0 w-full h-full bg-white/10 border-white/30 z-0"></div>

    <form onSubmit={handleSubmit} className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl w-full max-w-md p-8 sm:p-10 flex flex-col gap-4" >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Login</h2>

        {error && (<p className="text-red-500 text-center font-medium">{error}</p>)}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full p-3 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition" > Login </button>

        <p className="text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
