import React from 'react';
import { Menu,Button } from 'antd';
import { useState } from 'react';
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import AdminSidebar from './AdminSidebar';
import "../../Shared/styles/adminNavbar.css"
const AdminNavbar = (props) => {
    

  return (
    <>
    <Menu className='adminNavbar' theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
        <Button
          type="primary"
          onClick={props.toggleCollapsed}
          style={{
            margin:"12px "
          }}
        >
          {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <h2 className='logoText'>Business <span className='logo'>Spot</span> </h2>
    </Menu>
    </>
  );
};

export default AdminNavbar;
