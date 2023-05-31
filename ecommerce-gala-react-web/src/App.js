import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutOne from "./component/layout/LayoutOne";
import HomePage from "./page/home/HomePage";
import CustomerPage from "./page/customer/CustomerPage";
import CategoryPage from "./page/category/CategoryPage";
import ProductPage from "./page/product/ProductPage";
import User from "./page/user/User";
import PaymentMethodPage from "./page/payment_method/PaymentMethodPage";
import OrderStatusPage from "./page/order_status/OrderStatusPage";
import CartPage from "./page/cart/CartPage";
import "./App.css";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import WishList from "./page/wishlist/Wishlist";
// import User
function App() {
  const isLogin = localStorage.getItem("is_login") == "1"; // true
  return (
    <BrowserRouter>
      {isLogin && (
        <LayoutOne>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/user" element={<User />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/payment-method" element={<PaymentMethodPage />} />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishList />} />

            
            <Route path="*" element={<h1>Route Not Found!</h1>} />
          </Routes>
        </LayoutOne>
      )}

      {!isLogin && (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
