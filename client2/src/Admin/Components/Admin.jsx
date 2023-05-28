import React from "react"
import { Route, Routes, BrowserRouter,Navigate,useParams} from "react-router-dom"
import { useState, useEffect,useContext } from "react";
import { useCookies } from 'react-cookie';
import Dashboard from "./Dashboard"
import AddNewProduct from "./AddNewProduct";
import Category from "./Category";
import AdminSidebar from "./AdminSidebar";
import Signup from "./Signup";
import Login from './Login'
import ErrorPage from "./ErrorPage"
import VerifyUser from "./VerifyUser";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import ProductState from "../Context/productState"
import AdminNavbar from "./AdminNavbar";
import CategoriesContext from "../Context/CategoriesContext";
import '../../Shared/styles/admin.css';
import BusinessProfile from "./BusinessProfile";
import {CartProvider} from "../Context/cart_Context"
import AddCart from "./AddCart";

const App = () => {

  
  //----------------- User Authentication -----------------------
  const context = useContext(CategoriesContext);
  const { getCategories,categories } = context;

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    setIsLoggedin(false);
  };

  const handleLogin = () => {
    setIsLoggedin(true);
    getCategories();
  };

  useEffect(() => {
    if (cookies.jwt) {
      handleLogin()
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
  })

  //------------------- States--------------------------------------
  const [alert, setAlert] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
        setCollapsed(!collapsed);
  };
  //------------------State Handlers---------------
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 8000);
  };


  return (
    <>
      <ProductState>
        <CartProvider>
        <BrowserRouter>
          {(isLoggedin||cookies.jwt) ? (
            <AdminNavbar collapsed={collapsed} toggleCollapsed={toggleCollapsed}/>
            ) :
          (null)}
          <div className={ isLoggedin ? "loggedin-div" : "notLoggedin-div"}>
            {(isLoggedin||cookies.jwt) ? (
              <AdminSidebar collapsed={collapsed} handleLogout={handleLogout} />
             ) :
             (null)}
            <Routes>
              <Route path="/signup" element={<Signup alert={alert} showAlert={showAlert} />} />
              <Route path="/login" element={<Login alert={alert} handleLogin={handleLogin} showAlert={showAlert} />} />
              <Route path="/users/:userId/verify/:verificationToken" element={<VerifyUser />} />
              <Route path="/forgetPassword" element={<ForgetPassword alert={alert} showAlert={showAlert} />} />
              <Route path="/users/:userId/changePassword/:resetPasswordToken" element={<ChangePassword alert={alert} showAlert={showAlert} />} />
              {(isLoggedin||cookies.jwt) ? (
              <>
                <Route path="/" element={<Dashboard alert={alert} />} />
                <Route path="/addNewProduct" element={<AddNewProduct  showAlert={showAlert} />}/>
                <Route path="/categories/:categoryName" element={<Category/>}/>
                <Route path="/businessAbout" element={<BusinessProfile/>}/>
                <Route path="/cart" element={<AddCart/>}/>
              </>    
              ) : (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/addNewProduct" element={<Navigate to="/login" replace />} />
                <Route path="/categories/:categoryName" element={<Navigate to="/login" replace />} />
                <Route path="/businessAbout" element={<Navigate to="/login" replace />}/>
                <Route path="/cart" element={<Navigate to="/login" replace />}/>
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
}

export default App;
