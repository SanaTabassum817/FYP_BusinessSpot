import React from 'react';
import { Menu, Button } from 'antd';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import AdminSidebar from './AdminSidebar';
import "../../Shared/styles/adminNavbar.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/cart_Context";

const AdminNavbar = (props) => {
  const { cart } = useCartContext();
  const cartQuantity = cart.length;

  return (
    <>
      <Menu className='adminNavbar' theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
        <Button
          type="primary"
          onClick={props.toggleCollapsed}
          style={{
            margin: "12px "
          }}
        >
          {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <h2 className='logoText brandName'>Business <span className='logo'>Spot</span> </h2>
        <Link to="/cart">
          <ShoppingCartOutlined />
          <span>{cartQuantity}</span>
        </Link>
      </Menu>
    </>
  );
};

export default AdminNavbar;
