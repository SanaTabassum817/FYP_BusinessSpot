import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Divider, Button, Modal, Form, Input, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../Shared/styles/aboutBusiness.css";

const { Title } = Typography;
const { TextArea } = Input;

export default function UserProfile() {
  const initialValues = {
    name: "",
    profession: "",
    about: "",
    email: "",
    address: "",
    contactNumber: "",
    image: "",
  };

  const [userData, setUserData] = useState(initialValues);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log("Sending request to getUserInfo endpoint");
      const response = await axios.get("http://localhost:8000/getUser", { withCredentials: true });
      console.log("response from get frontend",response);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editProfile = async (updatedData) => {
    try {
      console.log("Edit profile data received frontend", updatedData);
      const formData = new FormData();
      formData.append("image", imageFile); // Append the image file to the form data
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      const response = await axios.put("http://localhost:8000/updateUser", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserData(response.data);
      console.log("Edit profile response data frontend ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("handleSave is called");
      editProfile(values);
      setEditModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = () => {
    setEditModalVisible(true);
  };

  const handleModalClose = () => {
    setEditModalVisible(false);
  };

  return (
    <div className="user-profile">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className="profile-image">
            <img src={userData.image} alt="Profile" />
          </div>
        </Col>

        <Col span={16}>
          <div className="header">
            <span>
              <Title level={3} style={{ marginRight: "16px" }}>
                {userData.name}
              </Title>
              <p className="profession">{userData.profession}</p>
            </span>
            <Button className="btnEdit" type="primary" icon={<EditOutlined />} onClick={handleEditButtonClick}>
              Edit
            </Button>
          </div>

          <Divider className="border" />
          <div className="about-section">
            <Title level={5}>About Me</Title>
            <p>{userData.about}</p>
          </div>
          <Divider className="border" />
          <div className="contact-info">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{userData.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.contactNumber}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal
        title="Edit User Profile"
        visible={editModalVisible}
        onCancel={handleModalClose}
        footer={null}
        onOk={handleSave}
        okText="Save"
      >
        <Divider className="border" />
        <Form
          form={form}
          initialValues={userData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSave}
        >
          <Form.Item label="Name" name="name" style={{marginBottom:"5px"}}>
            <Input />
          </Form.Item>
          <Form.Item label="Profession" name="profession" style={{marginBottom:"5px"}}>
            <Input />
          </Form.Item>
          <Form.Item label="About" name="about" style={{marginBottom:"5px"}}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Email" name="email" style={{marginBottom:"5px"}}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" style={{marginBottom:"5px"}}>
            <Input />
          </Form.Item>
          <Form.Item label="Contact Number" name="contactNumber" style={{marginBottom:"5px"}}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image" style={{marginBottom:"5px"}}>
            <Upload
              name="image"
              accept="image/*"
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
              fileList={[]}
            >
              <Button icon={<UploadOutlined />} disabled={imageFile !== null}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button htmlType="button" className="btn1" onClick={handleModalClose}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
