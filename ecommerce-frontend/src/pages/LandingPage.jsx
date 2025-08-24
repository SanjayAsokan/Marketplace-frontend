import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

export default function LandingPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // ✅ Auto-redirect logged-in users to their dashboards
  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/dashboard/admin");
      else if (user.role === "vendor") navigate("/dashboard/vendor");
      else navigate("/dashboard/user");
    }
  }, [user, navigate]);

  // Sample products
  const allProducts = [
    { title: "iPhone 15 Pro", description: "Latest Apple iPhone 15 Pro.", image: "https://tse2.mm.bing.net/th/id/OIP.6v1FaCqpgQTqAQFRgBLMWQHaHa?pid=Api&P=0&h=180" },
    { title: "MacBook Pro 16", description: "High-performance MacBook.", image: "https://tse3.mm.bing.net/th/id/OIP.1ws4h-L1hP1QBuL1dvT6AQHaEo?pid=Api&P=0&h=180" },
    { title: "Sony WH-1000XM5", description: "Noise-cancelling headphones.", image: "https://tse3.mm.bing.net/th/id/OIP.H3J9y2vAauDCuZUA1Ofb4wHaEK?pid=Api&P=0&h=180" },
    { title: "Canon DSLR", description: "Professional DSLR camera.", image: "https://tse3.mm.bing.net/th/id/OIP.pRaEEOcz4lySEjU3gKyI8AHaEK?pid=Api&P=0&h=180" },
    { title: "Apple Watch Ultra", description: "Track fitness & notifications.", image: "https://tse1.mm.bing.net/th/id/OIP.aT3wo6xMWHy3zzmYeucZegHaEK?pid=Api&P=0&h=180" },
    { title: "PlayStation 5", description: "Next-gen gaming console.", image: "https://tse4.mm.bing.net/th/id/OIP.XCjlXd_6583d8zK6HkmCuAHaEK?pid=Api&P=0&h=180" },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const displayedItems = allProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Features Section
  const features = [
    { title: "Secure Payments", description: "Your transactions are safe & encrypted.", icon: "💳" },
    { title: "Wide Selection", description: "Browse products across multiple categories.", icon: "🛍️" },
    { title: "24/7 Support", description: "We’re here to help anytime.", icon: "📞" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dozntnnrc/image/upload/v1756029816/pexels-eva-bronzini-7598248_vx8rwc.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div> {/* Overlay */}

      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center h-[70vh] px-4">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to Our Marketplace
        </h1>
        <p className="text-lg text-white/90 mb-6 drop-shadow-md max-w-xl">
          Discover amazing products from multiple vendors and enjoy a seamless shopping experience.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap justify-center gap-6 mt-16 px-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-2xl w-56 text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-800">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Products Section */}
      <section className="flex flex-wrap justify-center mt-16 gap-6 px-4">
        {displayedItems.map((item, i) => (
          <ProjectCard key={i} {...item} glass={true} className="shadow-2xl w-64" />
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2 mb-16">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-200">{page} / {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
}
