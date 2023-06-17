import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useCartContext } from "../Context/cart_Context";
import "../../Shared/styles/adminNavbar.css";
import CategoriesContext from "../Context/CategoriesContext";

const AdminNavbar = (props) => {
  const { cart } = useCartContext();
  const cartQuantity = cart.length;
  const navigate = useNavigate();
  const context = useContext(CategoriesContext);
  const { categories } = context; // destructuring
  const defaultCategory = categories.length > 0 ? categories[0].category : '';
  const handleMenuClick = (key) => {
    if (key === "home") {
      navigate("/");
    } else if (key === "logout") {
      props.handleLogout();
    } else if (key === "products") {
      navigate(`/categories/${defaultCategory}`);
    }
  };

  return (
    <>
      <div className="navBar">
        <Menu className="adminNavbar" theme="dark" mode="horizontal" defaultSelectedKeys={["products"]} onClick={({ key }) => handleMenuClick(key)}>
          <h3 className="logoText brandName">
            Business <span className="logo">Spot</span>{" "}
          </h3>
          <div className="subItems">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to={`/categories/${defaultCategory}`}>Products</Link>
            </Menu.Item>
          </div>
          <div className="icons">
            <Menu.Item key="cart">
              <Link to="/cart">
                <ShoppingCartOutlined />
                <span>{cartQuantity}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Link to="/userAbout">
                <UserOutlined />
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <LogoutOutlined />
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default AdminNavbar;
