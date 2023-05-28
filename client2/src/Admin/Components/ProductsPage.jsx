import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Select, Form, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../Context/cart_Context";
import CategoriesContext from "../Context/CategoriesContext";
import CartAmountToggle from "./CartAmountToggle";
import productContext from "../Context/ProductContext";
import "../../Shared/styles/productsPage.css";

const { Meta } = Card;

export default function ProductsPage(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    setAmount((prevAmount) => Math.max(prevAmount - 1, 1));
  };

  const setIncrease = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const context = useContext(productContext);
  const categoryContext = useContext(CategoriesContext);
  const { categories } = categoryContext;
  const { products, getProducts, getProductsByCategory } = context;
  const [filteredProducts, setFilteredProducts] = useState([]);

  let filteredCategories = [];
  if (categories.length > 0) {
    filteredCategories = categories.filter(
      (category) => category.category === props.productCategory
    );
  }

  useEffect(() => {
    form.resetFields(["filter"]);
    if (props.productCategory) {
      getProductsByCategory(props.productCategory);
    } else {
      getProducts();
    }
  }, [props.productCategory]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const onSelect = (value) => {
    if (value) {
      const result = filterProductsBySubcategory(value);
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  };

  const filterProductsBySubcategory = (subcategory) => {
    const result = products.filter(
      (product) => product.productSubCategory === subcategory
    );
    return result;
  };

  return (
    <div className="product-wrapper">
      <div className="filter-div">
        <Form form={form}>
          <Form.Item name="filter">
            <Select
              className="filter-box"
              placeholder="Filter"
              style={{ width: 150 }}
              allowClear
              onChange={onSelect}
            >
              {filteredCategories.length > 0 &&
                filteredCategories[0].subCategories.map(
                  (subcategory, index) => (
                    <Option key={index} value={subcategory}>
                      {subcategory}
                    </Option>
                  )
                )}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Card
              className="product-card"
              key={product._id}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt={product.productName}
                  src={product.productImages[0]}
                  style={{ marginTop: 0, height: 200, objectFit: "cover" }}
                />
              }
            >
              <Meta
                title={product.productName}
                description={product.productPrice}
                style={{ color: "black", fontSize: "18px" }}
              />
              <Space>
                <NavLink
                  to="/cart"
                  onClick={() => addToCart(product.id, product, amount)}
                >
                  <Button type="primary">Add to Cart</Button>
                </NavLink>
                <CartAmountToggle
                  amount={amount}
                  setDecrease={setDecrease}
                  setIncrease={setIncrease}
                />
              </Space>
            </Card>
          ))}
      </div>
    </div>
  );
}
