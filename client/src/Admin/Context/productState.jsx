import ProductContext from "./ProductContext";
import React, { useState } from "react";
import axios from 'axios';

const ProductState = (props) => {

  const host = "http://localhost:8000"
  // const productInital = {productName:"",productDescription:"",productPrice:0,productCategory:"",productImages:""}
  const productInital = []
  const [products, setProducts] = useState(productInital);

  //Get all productsf
  const getProducts = async () => {
    // API CALL
    try {
      const response = await fetch(`${host}/getProducts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: 'include',
      });
      // Client side
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if(jsonResponse.error){
        console.log(jsonResponse.error)
      }else{
        setProducts(jsonResponse);
      }
    }
    catch (error) {
      console.error(error);
      // Handle error here, e.g. show an error message to the user
    }

  }

  // Get Products by category
  const getProductsByCategory = async (productCategory) => {
    try {
      
        // API CALL
        const response = await fetch(`${host}/getProductsByCategory/${productCategory}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        // Client side
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if(jsonResponse.error){
          console.log(jsonResponse.error)
        }else{
          setProducts(jsonResponse);
          console.log(products);
        }
    } catch (error) {
      console.error(error);
    }
  }

  // // Add a Product
  const addProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append('productName', newProduct.productName);
      formData.append('productDescription', newProduct.productDescription);
      formData.append('productPrice', newProduct.productPrice);
      formData.append('productCategory', newProduct.productCategory);
      formData.append('productSubCategory', newProduct.productSubCategory);
      for(let i = 0; i < newProduct.productImages.length; i++) {
        formData.append('productImages', newProduct.productImages[i]);
      }
      // API CALL
      const response = await axios.post(`${host}/addNewProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'

        },
        withCredentials: true
      });
      if(response.status!=200){
        console.log("if");
        return false;
      }
    console.log(response.data);
    setProducts(products.concat(response.data));
    return true;
    
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  // Delete a Note
  const deleteProduct = async (id) => {
    try {
      // API CALL
      const response = await fetch(`${host}/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const json = await response.json();
      console.log(json);
      console.log("Deleting a product " + id);

      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    }
    catch (error) {
      console.error(error);
    }

  }

  // Edit a Product
  const editProduct = async (id, product) => {
    try { // API CALL
      const response = await fetch(`${host}/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
      });
      const json = await response.json();
      console.log(json);
      // Client side
      let newProducts = [...products];


      for (let index = 0; index < newProducts.length; index++) {
        const element = newProducts[index];

        if (element._id === id) {
          newProducts[index].productName = product.productName;
          newProducts[index].productPrice = product.productPrice;
          newProducts[index].productDescription = product.productDescription;
          newProducts[index].productCategory = product.productCategory;
          newProducts[index].productImages = product.productImages;
          break;
        }
      }
      setProducts(newProducts);
    }
    catch (error) {
      console.log(error);
    }

  };

  return (

    <ProductContext.Provider value={{ products, editProduct, deleteProduct, addProduct, getProducts, getProductsByCategory }}>
      {props.children}
    </ProductContext.Provider>
  )
}
export default ProductState;




