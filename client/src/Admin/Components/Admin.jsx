import React from "react"
import { Route, Routes, BrowserRouter,Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import Navbar from "./Navbar"
import Dashboard from "./Dashboard"
import AddNewProduct from "./AddNewProduct";
import Category from "./Category";
import SidebarComponent from "./SidebarComponent";
import '../../Shared/styles/admin.css';
import Signup from "./Signup";
import Login from './Login'
import ErrorPage from "./ErrorPage"
import VerifyUser from "./VerifyUser";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import ProductState from "../Context/productState"
import "../../Shared/styles/dashborad.css"
const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  //----------------- States -----------------------
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [alert, setAlert] = useState(null);

  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({});
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

  const handleAddCategory = (newCategory) => {
    setCategoryList((prevList) => [...prevList, newCategory]);
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
  }

  //-----------------------------------------------------------

  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        return true;
      }
    }
    return false;
  }

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    setIsLoggedin(false);
  };
  const handleLogin = () => {
    setIsLoggedin(true);
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getCategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const categories = await response.json()
      setCategoryList(categories)
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (cookies.jwt) {
      setIsLoggedin(true)
    }
    if (isLoggedin) {
      getCategories();
    }

  }, [isLoggedin]);

  useEffect(() => {
    console.log(categoryList);
    // Reset the isLoggedIn state to false for the login and signup pages
    const path = window.location.pathname;
    if (path === "/login" || path === "/signup" || path === "/users/:userId/verify/:verificationToken" || path === "/users/:userId/changePassword/:resetPasswordToken" || path === "/forgetPassword") {
      handleLogout()
    }
  })
  return (
    <>
      <ProductState>
        <BrowserRouter>
          <Navbar addCategoryHandler={handleAddCategory} />
          <div className={isLoggedin ? "main-div" : ""}>
            <SidebarComponent categoryList={categoryList} handleSelectCategory={handleSelectCategory} handleLogout={handleLogout} />
            <Routes>
              <Route path="/signup" element={<Signup alert={alert} showAlert={showAlert} />} />
              <Route path="/login" element={<Login alert={alert} handleLogin={handleLogin} showAlert={showAlert} />} />
              <Route path="/users/:userId/verify/:verificationToken" element={<VerifyUser />} />
              <Route path="/forgetPassword" element={<ForgetPassword alert={alert} showAlert={showAlert} />} />
              <Route path="/users/:userId/changePassword/:resetPasswordToken" element={<ChangePassword alert={alert} showAlert={showAlert} />} />
              <Route path="/" element={<Dashboard isLoggedin={isLoggedin} alert={alert} />} />
              <Route path="/addNewProduct" element={<AddNewProduct isLoggedin={isLoggedin} categoryList={categoryList} showAlert={showAlert}/>} />
              <Route path="/categories/:categoryName" element={<Category isLoggedin={isLoggedin} categoryList={categoryList}/>} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ProductState>
    </>
  );
}

export default App;
