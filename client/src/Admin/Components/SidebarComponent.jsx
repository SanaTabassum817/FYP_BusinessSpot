import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import pathToRegexp from 'path-to-regexp';
//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import '../../Shared/styles/sidebar.css'


const SidebarComponent = (props) => {

    const [showSubmenu, setShowSubmenu] = useState(false)
    const categoryList = props.categoryList;
    const navigate = useNavigate();

    const menuItemClickHandler=(event) => {
        // Remove the active class from the previously active item
        const activeItem = document.querySelector('.sidebar-item.active');
        activeItem.classList.remove('active');

        // Add the active class to the clicked item
        const clickedItem = event.currentTarget;
        // console.log(clickedItem);
        clickedItem.classList.add('active');
    };

    const categoryClickHandler=(event)=>{
        setShowSubmenu(!showSubmenu)
        menuItemClickHandler(event);
    };
    
    const subMenuItemClickHandler=(event) => {
        // Remove the active class from the previously active item
        const activeItem = document.querySelector('.sidebar-item.active');
        activeItem.classList.remove('active');

        // Add the active class to the clicked item
        let clickedItem = event.currentTarget;
        clickedItem.classList.add('active');
        const categoryName=event.target.getAttribute('name');
        const categoryIndex=event.target.getAttribute("id")
        const category=props.categoryList[categoryIndex]
        props.handleSelectCategory(category);
        navigate(`/categories/${categoryName}`);    
    };


    let location = useLocation();
    const isAllowedPath = ['/', '/addNewProduct', '/products', '/categories/:category'].some(path => {
        const regex = pathToRegexp(path);
        return regex.test(location.pathname);
    });
    if (!isAllowedPath) {
        return null;
    }

    return (
        <>
            <div className="sidebar" id="header">
                <ProSidebar>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem className={"sidebar-item active"} id="home" icon={<FiHome/>} onClick={menuItemClickHandler} >Home</MenuItem>
                            <MenuItem className={"sidebar-item"}  id="category" name="category" icon={<FaList/>} onClick={categoryClickHandler} >Categories { showSubmenu ? <FaAngleUp /> : <FaAngleDown />} </MenuItem>
                            <div className="sub-menu" style={{ display: showSubmenu ? 'block' : 'none' }}>
                                {categoryList.map((category,index) => (
                                    <li id={index} name={category.category} key={index} className="sidebar-item sub-item" onClick={subMenuItemClickHandler}>{category.category}</li>
                                ))}
                            </div>

                            <MenuItem className={"sidebar-item"}  id="product" name="product" icon={<FaList/>} onClick={menuItemClickHandler} >Products</MenuItem>
                            <MenuItem className={"sidebar-item"} id="settings" icon={<BiCog/>} onClick={menuItemClickHandler} >Settings</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem className={"sidebar-item"} id="logout" icon={<FiLogOut/>} onClick={props.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default SidebarComponent;

