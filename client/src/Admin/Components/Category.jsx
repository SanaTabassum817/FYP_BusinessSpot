import React from 'react';
import { useContext,} from 'react';
import { useParams,Navigate } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import ErrorPage from './ErrorPage';
import CategoriesContext from "../Context/CategoriesContext";

const Category = (props) => {
  const { categoryName } = useParams();
  return (
      <ProductsPage productCategory={categoryName}></ProductsPage>
  )
}

export default Category