import React, { useContext } from "react";
import {  Form, Input,Modal} from 'antd';
import CategoriesContext from "../Context/CategoriesContext";
const AddNewCategory=(props)=>{
 const context = useContext(CategoriesContext);
  const { addCategory } = context; // destructuring
  const [form] = Form.useForm();
    
    const onClose = () => {
        props.closeModal();
    };
    const handleSave = () => {
        form.validateFields().then((values) => {
            console.log(values);
            //call the function to send request to backend
            const result= addCategory(values.category)
            form.resetFields();
            onClose()
            if(!result){
              //show some error message
            }
        });
      };

    return(
    <Modal title="Add Category" open={props.open} onOk={handleSave} onCancel={onClose}>
        <Form form={form} layout="vertical">
            <Form.Item label="Add a new category for your business" name="category" rules={[{ required: true }]}>
                <Input placeholder="Enter category name"/>
            </Form.Item>       
        </Form>
      </Modal>
    )
}

export default AddNewCategory;
