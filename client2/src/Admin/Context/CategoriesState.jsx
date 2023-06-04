import React, { useState } from "react";
import CategoriesContext from "./CategoriesContext";

const CategoriesState = (props) => {
  const host = "http://localhost:8000";
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setCategories([]);
    try {
      const response = await fetch(`${host}/getCategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const categories = await response.json();

      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  return <CategoriesContext.Provider value={{ categories, getCategories }}>{props.children}</CategoriesContext.Provider>;
};
export default CategoriesState;
