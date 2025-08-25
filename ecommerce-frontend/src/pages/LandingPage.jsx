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

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/dashboard/admin");
      else if (user.role === "vendor") navigate("/dashboard/vendor");
      else navigate("/dashboard/user");
    }
  }, [user, navigate]);

  const allProducts = [
    { title: "iPhone 15 Pro", description: "Latest Apple iPhone 15 Pro.", image: "https://tse3.mm.bing.net/th/id/OIP.WQ47ZL0jswVNIRFqQG8TAwHaEK?pid=Api&P=0&h=180" },
    { title: "MacBook Pro 16", description: "High-performance MacBook.", image: "https://tse4.mm.bing.net/th/id/OIP.ay2lYY053CxEAuBucxBDLgHaE8?pid=Api&P=0&h=180" },
    { title: "Sony WH-1000XM5", description: "Noise-cancelling headphones.", image: "https://tse4.mm.bing.net/th/id/OIP.4fd-VUm_wSdzjvM-lgRD_gHaHa?pid=Api&P=0&h=180" },
    { title: "Canon DSLR", description: "Professional DSLR camera.", image: "https://tse4.mm.bing.net/th/id/OIP.S3NmvzJ0AgRD-HVWEh0TtQHaE8?pid=Api&P=0&h=180" },
    { title: "Apple Watch Ultra", description: "Track fitness & notifications.", image: "https://tse3.mm.bing.net/th/id/OIP.GGxLM41-eZXvfFWwQ51liwHaFF?pid=Api&P=0&h=180" },
    { title: "PlayStation 5", description: "Next-gen gaming console.", image: "https://tse4.mm.bing.net/th/id/OIP.XCjlXd_6583d8zK6HkmCuAHaEK?pid=Api&P=0&h=180" },
    { title: "Nintendo Switch", description: "Portable gaming console.", image: "https://tse1.mm.bing.net/th/id/OIP.7iv0B99NZkvUAr00igweKgHaEK?pid=Api&P=0&h=180" },
    { title: "Drone Camera", description: "High-tech drone for photography.", image: "https://tse4.mm.bing.net/th/id/OIP.BdRZ-q8Ya6i8yI-CyT-HbwHaEe?pid=Api&P=0&h=180" },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const displayedItems = allProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const features = [
    { title: "Secure Payments", description: "Your transactions are safe & encrypted.", icon: "💳" },
    { title: "Wide Selection", description: "Browse products across multiple categories.", icon: "🛍️" },
    { title: "24/7 Support", description: "We’re here to help anytime.", icon: "📞" },
    { title: "Fast Delivery", description: "Get your orders delivered quickly.", icon: "🚚" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-20 px-6 lg:px-20 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-800 text-white rounded-b-3xl relative overflow-hidden">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 z-10">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
            Discover Amazing Products
          </h1>
          <p className="text-lg lg:text-xl mb-6 max-w-lg animate-fadeIn delay-200">
            Explore top products from multiple vendors and enjoy a seamless shopping experience.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 animate-fadeIn delay-400">
            <button onClick={() => navigate("/signup")} className="px-8 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition text-lg">Get Started</button>
            <button onClick={() => navigate("/login")} className="px-8 py-3 bg-white text-indigo-900 rounded-lg hover:bg-gray-200 transition text-lg">Login</button>
          </div>
        </div>

        {/* Right Collage */}
        <div className="lg:w-1/2 flex flex-wrap justify-center gap-4 overflow-hidden">
          {allProducts.map((item, i) => (
            <div key={i} className="w-36 h-36 md:w-40 md:h-40 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-110 hover:rotate-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap justify-center gap-6 mt-16 px-4">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center bg-white p-6 rounded-xl w-56 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl border-2 border-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 shadow-lg"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Products Section */}
      <section className="flex flex-wrap justify-center mt-16 gap-6 px-4">
        {displayedItems.map((item, i) => (
          <ProjectCard 
            key={i} 
            {...item} 
            glass={true} 
            className="shadow-lg w-64 transform transition duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] border-2 border-purple-600 rounded-xl"
          />
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2 mb-16">
        <button className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 transition" disabled={page===1} onClick={() => setPage(page-1)}>Prev</button>
        <span className="px-4 py-2 text-gray-700">{page} / {totalPages}</span>
        <button className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 transition" disabled={page===totalPages} onClick={() => setPage(page+1)}>Next</button>
      </div>

      <Footer />
    </div>
  );
}
