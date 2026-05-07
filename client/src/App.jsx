import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");

  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="w-full min-h-screen bg-[#021a10] text-gray-700 overflow-x-hidden">

      {/* Navbar */}
      {!isSellerPath && <Navbar />}

      {/* Login Popup */}
      {showUserLogin && <Login />}

      {/* Notifications */}
      <Toaster position="top-right" />

      {/* Main Content */}
      <main className={`${!isSellerPath ? "pt-24" : ""}`}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route
            path="/products/:category"
            element={<ProductCategory />}
          />
          <Route
            path="/products/:category/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />

          {/* Seller Routes */}
          <Route
            path="/seller"
            element={
              isSeller ? <SellerLayout /> : <SellerLogin />
            }
          >
            <Route
              index
              element={isSeller ? <AddProduct /> : null}
            />
            <Route
              path="product-list"
              element={<ProductList />}
            />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>

      </main>

      {/* Footer */}
      {!isSellerPath && <Footer />}

    </div>
  );
};

export default App;