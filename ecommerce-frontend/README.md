🛒 Multi-Vendor E-Commerce Frontend

This is the frontend of the Multi-Vendor E-Commerce Marketplace built with React + Vite, Tailwind CSS, and Firebase Authentication.
It provides users with an intuitive UI to browse products, view details, add to cart, place orders, and track order history.
Vendors can manage their products through a separate dashboard, while admins oversee vendors, products, and analytics.

🚀 Features
👤 User

Browse all vendor products

View product details

Add products to cart & checkout

Manage orders & view order history

🛍 Vendor

Add, edit, and delete products

Manage inventory and pricing

Track sales

🛡 Admin

Manage vendors (approve, suspend, remove)

Manage products across vendors

View analytics & revenue reports

🛠 Tech Stack

React (Vite) – Frontend framework

Tailwind CSS – Styling

React Router DOM – Navigation & routing

Firebase Auth – Authentication (login/signup)

Axios – API requests

LocalStorage – Cart & session persistence

📂 Project Structure
frontend/
│── public/                # Static assets
│── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── Dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── VendorDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   └── user/           # User-specific pages (Cart, Orders, etc.)
│   ├── layouts/            # Dashboard layout wrappers
│   ├── App.jsx             # Main app routes
│   ├── main.jsx            # Entry point
│   └── firebase.js         # Firebase config & init
│── package.json
│── tailwind.config.js
│── README.md