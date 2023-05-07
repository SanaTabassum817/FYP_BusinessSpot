import React from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import Products from './Products';
import ErrorPage from './ErrorPage';
const Category = (props) => {
  
  const [cookies] = useCookies(['jwt']);
  if (!props.isLoggedin && !cookies.jwt) {
    return <Navigate to="/login? You are not logged in. Please login first." />;
  }
  console.log("category page called");
  const { categoryName } = useParams();
  // console.log(categoryName);
  // console.log(props.categoryList);
  const categoryExists = props.categoryList.find((item) => item.category === categoryName);

  if(!categoryExists){
      console.log("invalid category");
      return (<ErrorPage/>);
  }
  return (
    <div>
     <Products productCategory={categoryName}></Products>
    </div>
  )
}

export default Category