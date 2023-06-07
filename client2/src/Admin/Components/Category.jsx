import React from 'react';
import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag } from 'antd';
import ProductsPage from './ProductsPage';
import CategoriesContext from "../Context/CategoriesContext";

const Category = () => {
  const { categoryName } = useParams();
  const context = useContext(CategoriesContext);
  const { categories } = context;

  const tagStyle = {
    background: '#007bff',
    color: 'white',
    fontSize: '15px',
    border: '1px solid blue',
    
  };
  
  const selectedTagStyle = {
    ...tagStyle,
    background: 'white',
    color: '#007bff',
  };
  

  // Set the default category if categoryName is empty
  const defaultCategory = categories.length > 0 ? categories[0].category : '';

  // Set categoryName to defaultCategory if it's empty
  const selectedCategory = categoryName || defaultCategory;

  return (
    <>
      <div>
        <div style={{marginTop:"5px",marginLeft:"10px",marginRight:"5px",marginBottom:"5px"}}>{categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.category}`}>
            <Tag style={selectedCategory === category.category ? selectedTagStyle : tagStyle}>
              {category.category}
            </Tag>
          </Link>
        ))}</div>
       <ProductsPage productCategory={selectedCategory} />
         
      </div>
     
    </>
  );
};

export default Category;
