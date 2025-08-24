export default function Sidebar({ onSelect }) {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Vendor Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => onSelect("products")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            My Products
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("addProduct")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            Add Product
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("orders")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
          >
            My Orders
          </button>
        </li>
      </ul>
    </div>
  );
}
