🛒 Multi-Vendor E-Commerce Frontend
---
Frontend for the Multi-Vendor E-Commerce Marketplace, providing a smooth and responsive user interface for customers, vendors, and admins.

🔗 Live App: https://idyllic-swan-5001c9.netlify.app/


---
📌 Introduction

The frontend is built with React (Vite), styled with Tailwind CSS, and uses Redux Toolkit for state management.
It communicates with the backend API (Node.js + Express + MongoDB) for authentication, products, orders, vendors, and admin operations.


---
✨ Features

👤 User

  Register & Login (JWT auth via backend)

  Browse products across vendors

  View product details

  Add to cart & checkout

  View order history


🛍 Vendor

  Add, edit, and delete products

  Manage inventory & pricing

  Track sales and order details


🛡 Admin

  Approve, suspend, or remove vendors

  Manage products across vendors

  View analytics & revenue reports


🛠 Tech Stack

  ⚛️ React (Vite) – Frontend framework

  🎨 Tailwind CSS – Styling

  🔗 React Router DOM – Routing

  🌐 Axios – API requests to backend

  💾 Redux Toolkit – State management (auth, cart, orders)

  🔐 JWT Auth (via backend) – Secure authentication


---
📂 Project Structure
ecommerce-frontend/
│── public/              # Static assets
│── src/
│   ├── api/             # Axios setup & API calls
│   ├── assets/          # Images & icons
│   ├── components/      # Reusable UI (Navbar, Footer, ProjectCard, etc.)
│   ├── features/        # Redux slices (authSlice.js, cart, orders, etc.)
│   ├── pages/
│   │   ├── Dashboard/   # Admin, Vendor, and User dashboards
│   │   ├── user/        # User-specific pages (Cart, Checkout, OrderHistory)
│   │   ├── vendor/      # Vendor pages (ProductForm, ProductList, Orders, etc.)
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   └── ProductDetails.jsx / ProductList.jsx
│   ├── layouts/         # Layout wrappers (dashboard layouts)
│   ├── App.jsx          # Main app routes
│   ├── main.jsx         # Entry point
│   ├── App.css / index.css
│
│── package.json
│── vite.config.js
│── eslint.config.js
│── README.md


---
⚙️ Getting Started

Clone the repository:

git clone https://github.com/your-username/ecommerce-frontend.git
cd ecommerce-frontend


---
Install dependencies:

npm install

Update the backend API base URL inside your Axios setup (src/api/).

Start development server:

npm run dev


---
📡 API Integration

This frontend communicates with the backend:
👉 https://ecommerce-backend-v6q2.onrender.com


---
Example APIs used:

POST /api/auth/login – User login

GET /api/products – Fetch all products

POST /api/orders – Place an order

POST /api/vendor/products – Vendor creates product


---
🤝 Contributing

Contributions are welcome 🎉

Fork the repository

Create a new branch

Commit your changes

Push & open a Pull Request 🚀


---
📜 License

This project is licensed under the MIT License.
