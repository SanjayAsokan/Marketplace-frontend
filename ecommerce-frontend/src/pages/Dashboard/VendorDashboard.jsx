import { useState } from "react";
import Sidebar from "./vendor/Sidebar";
import ProductList from "./vendor/ProductList";
import ProductForm from "./vendor/ProductForm";
import OrderList from "./vendor/OrderList";

export default function VendorDashboard() {
  const [section, setSection] = useState("products");

  return (
    <div className="flex">
      <Sidebar onSelect={setSection} />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {section === "products" && <ProductList />}
        {section === "addProduct" && (
          <ProductForm onProductAdded={() => setSection("products")} />
        )}
        {section === "orders" && <OrderList />}
      </div>
    </div>
  );
}
