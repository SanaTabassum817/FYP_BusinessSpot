import React from 'react';
import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag } from 'antd';
import ProductsPage from './ProductsPage';
import ErrorPage from './ErrorPage';
import CategoriesContext from "../Context/CategoriesContext";

const Category = () => {
  const { categoryName } = useParams();
  const context = useContext(CategoriesContext);
  const { categories } = context;

  const tagStyle = {
    background: 'purple',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'normal',
  };

  const selectedTagStyle = {
    ...tagStyle,
    background: 'lightgray',
    color: 'purple',
  };

  // Set the default category if categoryName is empty
  const defaultCategory = categories.length > 0 ? categories[0].category : '';

  // Set categoryName to defaultCategory if it's empty
  const selectedCategory = categoryName || defaultCategory;

  return (
    <>
      <div>
        {categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.category}`}>
            <Tag style={selectedCategory === category.category ? selectedTagStyle : tagStyle}>
              {category.category}
            </Tag>
          </Link>
        ))}
         <ProductsPage productCategory={selectedCategory} />
      </div>
     
    </>
  );
};

export default Category;
