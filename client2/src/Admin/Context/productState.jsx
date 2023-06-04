import ProductContext from "./ProductContext";
import React, { useState } from "react";
import axios from "axios";

const ProductState = (props) => {
  const host = "http://localhost:8000";
  // const productInital = {productName:"",productDescription:"",productPrice:0,productCategory:"",productImages:""}
  const productInital = [];
  const [products, setProducts] = useState(productInital);

  const productsHandler = (data) => {
    setProducts(data);
  };

  //Get all productsf
  const getProducts = async () => {
    // API CALL
    setProducts([]);
    try {
      const response = await fetch(`${host}/getProducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // Client side
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.error) {
        console.log(jsonResponse.error);
      } else {
        setProducts(jsonResponse);
      }
    } catch (error) {
      console.error(error);
      // Handle error here, e.g. show an error message to the user
    }
  };

  // Get Products by category
  const getProductsByCategory = async (productCategory) => {
    try {
      setProducts([]);
      // API CALL
      const response = await fetch(`${host}/getProductsByCategory/${productCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // Client side
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      if (jsonResponse && jsonResponse.length > 0) {
        setProducts(jsonResponse);
        // console.log(products);
      } else if (jsonResponse.error) {
        console.log(jsonResponse.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, getProducts, getProductsByCategory, productsHandler }}>{props.children}</ProductContext.Provider>
  );
};
export default ProductState;
