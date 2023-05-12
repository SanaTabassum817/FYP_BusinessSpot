import React from 'react';
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined,MenuFoldOutlined,MenuUnfoldOutlined,DashboardOutlined,GoldOutlined,PlusSquareOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState,useContext } from 'react';
import AddNewCategory from './AddNewCategory';
import CategoriesContext from "../Context/CategoriesContext";
import "../../Shared/styles/adminSidebar.css"
const AdminSidebar= (props) => {

  const context = useContext(CategoriesContext);
  const { categories} = context; // destructuring

    const [open,setOpen]=useState(false);

    const openModal=()=>{
        setOpen(true);
    }
    const closeModal=()=>{
        setOpen(false);
    }

    function getItem(label, key, icon, children, type) {
        return {key,icon,children,label,type,};
    }

    const items = [
        getItem('Dashboard', 'dashboard', <DashboardOutlined />),
        getItem('Add New Category', 'addNewCategory',<PlusSquareOutlined />),
        getItem('Add New Product', 'addNewProduct',<PlusSquareOutlined />),
        getItem('Categories', 'sub1', <GoldOutlined />,categories.map((category, index) =>
            getItem(category.category, index)
        )),
        getItem('Logout', 'logout',<LogoutOutlined />),
    ];

    const navigate = useNavigate();

    const handleMenuClick = (key) => {
        // console.log(key);  
        if (key ==='dashboard'){
            navigate('/');
        }else if(key==='addNewProduct'){
            navigate('/addNewProduct');
        }else if(key ==='addNewCategory'){
            openModal();
        }else if(key==="logout"){
            props.handleLogout()
        }else{
            const categoryName = categories[key].category;
            
            return navigate(`/categories/${categoryName}`);
        } 
    };

    return (
      <>  
        <Menu
          // className='adminSidebar'
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={props.collapsed}
          style={{ width: props.collapsed ? '80px' : '256px'}}
          items={items}
          onClick={({ key }) =>handleMenuClick(key)}
        />
        <AddNewCategory open={open} openModal={openModal} closeModal={closeModal}/>
      </>
    );
  
};
  export default AdminSidebar;