import React, {useState, useContext} from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';
import "../../Shared/styles/addNewProductPage.css"
import productContext from "../Context/ProductContext";
import CategoriesContext from "../Context/CategoriesContext";
import { Row, Col, Form, Select, Input,InputNumber, Button,Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const AddNewProduct = (props) => {

    const context = useContext(productContext);
    const categoryContext = useContext(CategoriesContext);
    const { categories} = categoryContext // destructuring
    console.log(categories);
    const { addProduct} = context; // destructuring
    const [form] = Form.useForm();
    const { Option } = Select;

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    const navigate = useNavigate()
    const [subcatalog, setSubCatalog] = useState([]);
    const [msg, setMsg] = useState()

    const [cookies] = useCookies(['jwt']);
    if (!props.isLoggedin && !cookies.jwt) {
        return <Navigate to="/login? You are not logged in. Please login first." />;
    }

    
    const onSelectEventHandler = (value,option) => {
        const categoryIndex = option.key;
        if (categoryIndex >= 0) {
            setSubCatalog(categories[categoryIndex].subCategories)
        } else {
            setSubCatalog([])
            // setProduct({ ...product, [event.target.name]: null, productSubCategory: null })
        }
       
    }

    const onSubmitEventHandler = async (values) => {
            try{
                const result = await addProduct(values); //returns true or false
                if (result) { 
                    const successMsg="Product added successfully"
                    setMsg(successMsg);
                    props.showAlert(msg, "success");
                    navigate('/')
                } else {
                    const errorMsg = "Product could not be saved due to some error."
                   
                    setMsg(errorMsg)
                    // console.log("msg: ",msg);
                    props.showAlert(msg , "danger");
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

    const beforeUpload = (file) => {
        return false; // Returning false prevents the upload request from being sent
      };
    return (
        <div className="content-div">
            <div className="col-md-6">
                <header className='card-heading mb-1'>Add <span>Product</span></header>
            </div>
            <div className="col-md-6">
                <Form form={form} onFinish={onSubmitEventHandler}>
                    <Form.Item label="Product Name" name="productName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Product Price"
                        name="productPrice"
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            type="number"
                            min={0}
                            step={0.01}
                            precision={0}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        className="category"
                        label="Category"
                        name="productCategory"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select category"
                            onChange={onSelectEventHandler}
                        >
                            {categories.map((category, index) => (
                            <Option key={index} value={category.category}>{category.category}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Sub-Category"
                        name="productSubCategory"
                    >
                        <Select
                            placeholder="Select sub-category"
                        >
                            {subcatalog.map((subCategory, index) => (
                            <Option key={index} value={subCategory}>{subCategory}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Product Description" name="productDescription" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Upload" name="productImages" valuePropName="productImages" getValueFromEvent={normFile} rules={[{ required: true }]}>
                        <Upload action="/upload.do" listType="picture-card"  beforeUpload={beforeUpload} multiple={true} accept=".png,.jpg,.jpeg">
                        <div>
                            <PlusOutlined />
                            <div style={{marginTop: 8,}}>Upload</div>
                        </div>
                        </Upload>
                    </Form.Item>
                    <div className="save-btn-warapper">
                        <Form.Item>
                            <Button type="primary" className="save-btn" htmlType="submit">Save</Button>
                        </Form.Item>
                    </div>                
                </Form>
            </div>
        </div>
    )
}

export default AddNewProduct