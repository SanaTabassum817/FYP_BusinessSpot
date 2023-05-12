import React, { useState } from "react";
import CategoriesContext from "./CategoriesContext";

const CategoriesState = (props) => {

    const host = "http://localhost:8000"
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
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
              body: JSON.stringify({category:category})
            });
          const jsonResponse = await response.json()
          if(jsonResponse._id){
            setCategories(categories.concat(jsonResponse))
            return true;
          }else{
            return false;
          }
        }catch (error) {
          console.log(error);
        }
    }

    return (

        <CategoriesContext.Provider value={{ categories,getCategories,addCategory}}>
          {props.children}
        </CategoriesContext.Provider>
      )
}
export default CategoriesState;