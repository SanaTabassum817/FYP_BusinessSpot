import React from 'react';
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined,MenuFoldOutlined,UserOutlined,OrderedListOutlined,MenuUnfoldOutlined,DashboardOutlined,GoldOutlined,PlusSquareOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState,useContext } from 'react';
import AddNewCategory from './AddNewCategory';
import AddNewSubCategory from './AddNewSubCategory';
import CategoriesContext from "../Context/CategoriesContext";
import "../../Shared/styles/adminSidebar.css"
import Order from './Orders';
const AdminSidebar= (props) => {

  const context = useContext(CategoriesContext);
  const { categories} = context; // destructuring

    const [openModalCategory,setOpenModalCategory]=useState(false);

    const handleOpenModalCategory=()=>{
        setOpenModalCategory(true);
    }
    const handleCloseModalCategory=()=>{
        setOpenModalCategory(false);
    }

    const [openModalSubCategory,setOpenModalSubCategory]=useState(false);

    const handleOpenModalSubCategory=()=>{
        setOpenModalSubCategory(true);
    }
    const handleCloseModalSubCategory=()=>{
        setOpenModalSubCategory(false);
    }

    function getItem(label, key, icon, children, type) {
        return {key,icon,children,label,type,};
    }

    const items = [
        getItem('Dashboard', 'dashboard', <DashboardOutlined />),
        getItem('Add', 'add',<PlusSquareOutlined />,
        [
            getItem('Category', 'addNewCategory',),
            getItem('Sub-Category', 'addNewSubCategory',),
            getItem('Product', 'addNewProduct',),
        ]),
        getItem('Categories', 'sub1', <GoldOutlined />,categories.map((category, index) =>
            getItem(category.category, index)
        )),
        getItem('Orders', 'orders',<OrderedListOutlined />),
        getItem('BusinessProfile', 'businessProfile',<UserOutlined />),
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
            handleOpenModalCategory();
        }else if(key ==='addNewSubCategory'){
            handleOpenModalSubCategory();
        }else if(key==="logout"){
            props.handleLogout()
        }
        else if(key==='orders'){
            navigate('/orders');
        }
        else if(key==='businessProfile'){
            navigate('/businessAbout');
        }else{
            const categoryName = categories[key].category;
            
            return navigate(`/categories/${categoryName}`);
        } 
    };

    return (
      <>  
        <Menu
          className='adminSidebar'
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={props.collapsed}
          style={{ width: props.collapsed ? '80px' : '256px'}}
          items={items}
          onClick={({ key }) =>handleMenuClick(key)}
        />
        <AddNewCategory open={openModalCategory} closeModal={handleCloseModalCategory}/>
        <AddNewSubCategory open={openModalSubCategory} closeModal={handleCloseModalSubCategory}/>
      </>
    );
  
};
  export default AdminSidebar;