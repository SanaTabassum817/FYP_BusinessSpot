import React from "react";
import { Route, Routes, BrowserRouter, Navigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

import Category from "./Category";
import AuthForm from "./AuthForm";
import ErrorPage from "./ErrorPage";
import VerifyUser from "./VerifyUser";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import ProductState from "../Context/productState";
import AdminNavbar from "./AdminNavbar";
import CategoriesContext from "../Context/CategoriesContext";
import "../../Shared/styles/admin.css";
import UserProfile from "./UserProfile";
import { CartProvider } from "../Context/cart_Context";
import AddCart from "./AddCart";
import CheckoutPage from "./CheckOut";
import PaymentPage from "./Payment";
import Home from "./Home";


const App = () => {
  //----------------- User Authentication -----------------------
  const context = useContext(CategoriesContext);
  const { getCategories, categories } = context;

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleLogout = () => {
    removeCookie("jwt", { path: "/" });
    setIsLoggedin(false);
  };

  const handleLogin = () => {
    setIsLoggedin(true);
    getCategories();
  };

  useEffect(() => {
    if (cookies.jwt) {
      handleLogin();
    }
  }, [isLoggedin]);

  useEffect(() => {
    // console.log(categories);
    // Reset the isLoggedIn state to false for the login and signup pages
    const path = window.location.pathname;
    if (
      /^\/login$/.test(path) ||
      /^\/signup$/.test(path) ||
      /^\/users\/[^/]+\/verify\/[^/]+$/.test(path) ||
      /^\/users\/[^/]+\/changePassword\/[^/]+$/.test(path) ||
      /^\/forgetPassword$/.test(path)
    ) {
      handleLogout();
    }
  });

  return (
    <>
     
        <ProductState>
          <CartProvider>
            <BrowserRouter>
              {isLoggedin || cookies.jwt ? <AdminNavbar handleLogout={handleLogout} /> : null}
              <div className={isLoggedin ? "loggedin-div" : "notLoggedin-div"}>
                <Routes>
                  <Route path="/login" element={<AuthForm handleLogin={handleLogin} />} />
                  <Route path="/users/:userId/verify/:verificationToken" element={<VerifyUser />} />
                  <Route path="/forgetPassword" element={<ForgetPassword />} />
                  <Route path="/users/:userId/changePassword/:resetPasswordToken" element={<ChangePassword />} />
                  {isLoggedin || cookies.jwt ? (
                    <>
                      <Route path="/" element={<Home />} />
                      <Route path="/categories/:categoryName" element={<Category />} />
                      <Route path="/userAbout" element={<UserProfile />} />
                      <Route path="/cart" element={<AddCart />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Navigate to="/login" replace />} />
                      <Route path="/categories/:categoryName" element={<Navigate to="/login" replace />} />
                      <Route path="/userAbout" element={<Navigate to="/login" replace />} />
                      <Route path="/cart" element={<Navigate to="/login" replace />} />
                      <Route path="/checkout" element={<Navigate to="/login" replace />} />
                      <Route path="/payment" element={<Navigate to="/login" replace />} />
                    </>
                  )}
                  <Route path="/*" element={<ErrorPage />} />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </ProductState>
     
    </>
  );
};

export default App;
