import React, { useState,useContext } from "react";
import CategoriesContext from "../Context/CategoriesContext";
import {  Form, Select, Input,Button,Modal} from 'antd';

const AddNewSubCategory=(props)=>{
    const categoryContext = useContext(CategoriesContext);
    const { categories,addSubCategory} = categoryContext // destructuring
    // console.log(categories);
    const [form] = Form.useForm();
    const { Option } = Select;

    const onClose = () => {
        // setMsg(null);
        // setCategory(null);
        props.closeModal();
    };
    const handleSave =() => {
        form.validateFields().then(async(values) => {
            console.log(values);
            //call the function to send request to backend
            const result=await addSubCategory(values)
            console.log(result);
            form.resetFields();
            onClose()
        });
      };

    return(
    <Modal title="Add Sub-Category" open={props.open} onOk={handleSave} onCancel={onClose}>
        <Form form={form} >
            <Form.Item
                className="category"
                label="Category"
                name="category"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select category"
                    // onChange={onSelectEventHandler}
                >
                    {categories.map((category, index) => (
                    <Option key={index} value={category.category}>{category.category}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Sub-Category" name="subcategory" rules={[{ required: true }]}>
                <Input placeholder="Enter sub-category name"/>
            </Form.Item>         
        </Form>
      </Modal>
    )
}

export default AddNewSubCategory;