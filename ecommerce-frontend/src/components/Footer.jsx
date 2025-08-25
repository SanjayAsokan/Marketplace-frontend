export default function Footer() {
  return (
  <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 border-t-4 border-yellow-500">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
      <div>
        <h3 className="font-bold text-lg mb-3">About Us</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          MyMarketplace connects buyers and sellers worldwide. Discover top products and best deals.
        </p>
      </div>
      
      <div>
        <h3 className="font-bold text-lg mb-3">Categories</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer transition">Electronics</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Fashion</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Home & Kitchen</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Gaming</li>
          </ul>
      </div>
      
      <div>
        <h3 className="font-bold text-lg mb-3">Support</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer transition">Help Center</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Shipping & Returns</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Payment Methods</li>
            <li className="hover:text-yellow-400 cursor-pointer transition">Contact Us</li>
          </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">Connect</h3>
          <div className="flex space-x-4 mb-4">
            <span className="text-2xl cursor-pointer hover:text-yellow-400 transition">📘</span>
            <span className="text-2xl cursor-pointer hover:text-yellow-400 transition">🐦</span>
            <span className="text-2xl cursor-pointer hover:text-yellow-400 transition">📸</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Subscribe to newsletter" className="flex-1 px-3 py-2 rounded text-gray-900 focus:outline-none" />
            <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition"> Subscribe </button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-sm">
        © 2025 MyMarketplace. All rights reserved.
      </div>
    </footer>
  );
}
