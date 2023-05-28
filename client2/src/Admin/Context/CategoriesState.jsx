import React, { useState } from "react";
import CategoriesContext from "./CategoriesContext";

const CategoriesState = (props) => {
  
    const host = "http://localhost:8000"
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
      setCategories([])
        try {
          const response = await fetch(`${host}/getCategories`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
          });
          const categories = await response.json()
          
          setCategories(categories)
        }
        catch (error) {
          console.log(error);
        }
    }

    const addCategory=async(category)=>{
        try{
            const response = await fetch(`${host}/addNewCategory`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({category:category})
            });
          const jsonResponse = await response.json()
          if(jsonResponse._id){
            setCategories([...categories, jsonResponse])
            return true;
          }else{
            return false;
          }
        }catch (error) {
          console.log(error);
        }
    }

    const addSubCategory=async(formData)=>{
      try{
        console.log(formData.category);
        console.log(formData.subcategory);
        const response = await fetch(`${host}/categories/${formData.category}/addNewSubCategory`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({"subcategory":formData.subcategory})
        });
    
        const jsonResponse = await response.json();
        if (jsonResponse._id) {
          // Handle successful update
          // For example, update the categories state with the updated category
          const updatedCategories = categories.map((category) => {
            if (category._id === jsonResponse._id) {
              return { ...category, ...jsonResponse };
            }
            return category;
          });
    
          setCategories(updatedCategories);
          return true;
        } else {
          // Handle update failure
          console.log("Some error has occured");
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (

        <CategoriesContext.Provider value={{ categories,getCategories,addCategory,addSubCategory}}>
          {props.children}
        </CategoriesContext.Provider>
      )
}
export default CategoriesState;