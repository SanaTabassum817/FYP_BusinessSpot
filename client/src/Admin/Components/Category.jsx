import React from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import ProductsPage from './ProductsPage';
import ErrorPage from './ErrorPage';
const Category = (props) => {
  
  const [cookies] = useCookies(['jwt']);
  if (!props.isLoggedin && !cookies.jwt) {
    return <Navigate to="/login? You are not logged in. Please login first." />;
  }
  console.log("category page called");
  const { categoryName } = useParams();
  const categoryExists = props.categoryList.find((item) => item.category === categoryName);

  if(!categoryExists){
      console.log("invalid category");
      return (<ErrorPage/>);
  }
  return (
      <ProductsPage productCategory={categoryName} categoryList={props.categoryList}></ProductsPage>
  )
}

export default Category