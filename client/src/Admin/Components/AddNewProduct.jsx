import React, { useEffect, useState, useContext } from "react";
import CarouselComponent from "./CarouselComponent";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';
import "../../Shared/styles/addNewProduct.css"
import productContext from "../Context/ProductContext";

const AddNewProduct = (props) => {

    const context = useContext(productContext);
    const { addProduct } = context; // destructuring

    const navigate = useNavigate()
    const [images, setImages] = useState([]);
    const [subcatalog, setSubCatalog] = useState([]);
    const categories = props.categoryList;
    // console.log(categories);
    const productInfo = {
        productName: "",
        productPrice: 0,
        productCategory: "",
        productSubCategory: "",
        productDescription: "",
        productImages: []
    }
    const error = {
        nameError: "",
        priceError: "",
        quantityError: "",
        categoryError: "",
        imageError: "",
        descriptionError: "",
        errorMsg: "",
        successMsg: ""
    }
    const [product, setProduct] = useState(productInfo)
    const [msg, setMsg] = useState(error)

    const [cookies] = useCookies(['jwt']);
    if (!props.isLoggedin && !cookies.jwt) {
        return <Navigate to="/login? You are not logged in. Please login first." />;
    }

    const onChangeEventHandler = (event) => {
        event.preventDefault();
        if (event.target.name === "productImages") {
            const files = event.target.files;
            const images = [];
            for (let i = 0; i < files.length; i++) {
            images.push(files[i]);
            }
            setProduct({ ...product, [event.target.name]: images })
        } else {
            setProduct({ ...product, [event.target.name]: event.target.value })
        }
        
    }
    const onSelectEventHandler = (event) => {
        event.preventDefault();
        const categoryName = event.target.value;
        const categoryIndex = event.target.selectedIndex - 1;
        if (categoryIndex >= 0) {
            setSubCatalog(categories[categoryIndex].subCategories)
            setProduct({ ...product, [event.target.name]: categoryName, productSubCategory: null })
        } else {
            setSubCatalog([])
            setProduct({ ...product, [event.target.name]: null, productSubCategory: null })
        }
       
    }

    const onSubmitEventHandler = async (event) => {
        event.preventDefault()
        // console.log(product);
        // -----------Client side user validation-------------
        let isError = false;
        if (product.productName.length === 0) {
            error.nameError = "Please enter the product name"
            isError = true
        } else {
            error.nameError = ""
        }
        if (product.productPrice <= 0) {
            error.priceError = "Please enter a valid price"
            isError = true
        } else {
            error.priceError = ""
        }
        if (!product.productCategory||product.productCategory.length === 0) {
            error.categoryError = "Please select the category of product"
            isError = true
        } else {
            error.categoryError = ""
        }
        if (product.productDescription.length === 0) {
            error.descriptionError = "Please tell something about your product"
            isError = true
        } else {
            error.descriptionError = ""
        }
        if (product.productImages.length === 0) {
            error.imageError = "Upload 1 image, Max size=3MB "
            isError = true
        } else {
            error.imageError = ""
        }
        if (isError) {
            setMsg((prevValue) => {
                return ({
                    ...error,  //using spread opearator
                })
            })
        }
        // if no error occurs then call backend api
        else {
            try{
                const result = await addProduct(product); //returns true or false
                if (result) { 
                    error.errorMsg = ""
                    error.successMsg="Product added successfully"
                    setMsg(error);
                    props.showAlert(error.successMsg, "success");
                    navigate('/')
                } else {
                    error.errorMsg = "Product could not be saved due to some error."
                    error.successMsg = ""
                    setMsg(error)
                    // console.log("msg: ",msg);
                    props.showAlert(error.errorMsg , "danger");
                    navigate('/')
                }
            }catch (error) {
                console.log(error);
                error.errorMsg = "Product could not be saved due to some error.";
                error.successMsg = "";
                setMsg(error);
                props.showAlert(error.errorMsg , "danger");
                navigate('/')
              }
        }
    }

    return (
        <div className="content">
            <div>
                <header className='card-heading mb-1 heading'>Add <span>Product</span></header>
                {/* <h2 className="heading">Add Product</h2> */}
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={onSubmitEventHandler}>
                            <div className="form-group">
                                <div className="label-and-span">
                                    <label htmlFor="name">Name</label>
                                    <span className="link-danger" id='nameError'>{msg.nameError}</span>
                                </div>
                                <input type="text" className="form-control" id="name" name="productName" onChange={onChangeEventHandler} />
                            </div>
                            <div className="form-group">
                                <div className="label-and-span">
                                    <label htmlFor="price">Price</label>
                                    <span className="link-danger" id='priceError'>{msg.priceError}</span>
                                </div>
                                <input type="number" className="form-control" id="price" name="productPrice" onChange={onChangeEventHandler} />
                            </div>
                            <div className="form-group">
                                <div className="label-and-span">
                                    <label htmlFor="category">Category</label>
                                    <span className="link-danger" id='categoryError'>{msg.categoryError}</span>
                                </div>
                                <select className="form-control" id="categoryInput" name="productCategory" onChange={onSelectEventHandler}>
                                    <option value="">Select Category</option>
                                    {props.categoryList.map((category, index) => (
                                        <option key={index} value={category.category}>{category.category}</option>
                                    ))}
                                </select>
                                <select className="form-control" id="sub-categoryInput" name="productSubCategory" onChange={onChangeEventHandler}>
                                    <option value="">Select Sub-Category</option>
                                    {subcatalog.map((subCategory, index) => (
                                        <option key={index} value={subCategory}>{subCategory}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="label-and-span">
                                    <label htmlFor="image">Image</label>
                                    <span className="link-danger" id='imageError'>{msg.imageError}</span>
                                </div>
                                <input
                                    type="file"
                                    name="productImages"
                                    accept=".jpg, .jpeg, .png"
                                    max-size="3000000"
                                    multiple
                                    className="form-control-file"
                                    id="image"
                                    onChange={onChangeEventHandler}

                                />
                            </div>
                            <div className="form-group">
                                <div className="label-and-span">
                                    <label htmlFor="description">Description</label>
                                    <span className="link-danger" id='descriptionError'>{msg.descriptionError}</span>
                                </div>
                                <textarea className="form-control" id="description" rows="3" name="productDescription" onChange={onChangeEventHandler}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>

                        </form>
                    </div>
                    <div className="col-md-6" id="previewImageDiv">
                        <div className="previewImage">
                            <CarouselComponent images={images} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewProduct