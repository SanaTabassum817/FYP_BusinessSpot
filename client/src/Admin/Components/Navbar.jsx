// import React,{useEffect} from 'react'  // rafce
import React , { useState} from "react";
import {Link,useLocation } from "react-router-dom";
import '../../Shared/styles/navbar.css'
import AddNewCategory from "./AddNewCategory";
import pathToRegexp from 'path-to-regexp';

const Navbar = (props) => {
let location = useLocation();
  
  //----------states and state handlers for addNewCategory component-------
  const [isAddNewCategoryModalOpen, setIsAddNewCategoryModalOpen]=useState(false);
  const openAddNewCategoryModal = () => {
    setIsAddNewCategoryModalOpen(true);
  };
  const onClose = () => {
    setIsAddNewCategoryModalOpen(false);
  };

  const isAllowedPath = ['/','/addNewProduct', '/products', '/categories/:category'].some(path => {
    const regex = pathToRegexp(path);
    return regex.test(location.pathname);
  });
  if (!isAllowedPath) {
    return null;
  }

  return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" id='navbar-brand'>BusinessSpot</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link`}  onClick={openAddNewCategoryModal}>Add new category</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link`} to="/addNewProduct">Add new product</Link>
                </li>
              </ul>
            </div>
          </div>
          <AddNewCategory
            isOpen={isAddNewCategoryModalOpen}
            onClose={onClose}
            addCategoryHandler={props.addCategoryHandler}
          />
        </nav>
      </>
  
  )
}

export default Navbar