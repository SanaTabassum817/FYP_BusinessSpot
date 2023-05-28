import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Typography, Divider, Space, Tag, Button, Upload, Modal, Form, Input } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  EditOutlined,
  InstagramOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../../Shared/styles/aboutBusiness.css";

const { Title } = Typography;
const { TextArea } = Input;

export default function BusinessProfile() {
  const initialValues = {
    businessName: "",
    businessTagline: "",
    businessDescription: "",
    businessEmail: "",
    businessAddress: "",
    bContactNumber: "",
    youtube: "",
    linkedIn: "",
    twitter: "",
    instagram: "",
    facebook: "",
    logoImage: "",
  };
  const [businessData, setBusinessData] = useState(initialValues);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      console.log("sending request of getUserInfo at backend");
      const response = await axios.get("http://localhost:8000/getUserInfo", { withCredentials: true });
      console.log(response);
      setBusinessData(response.data);
      //console.log();
    } catch (error) {
      console.log("error occured.");
      console.error(error);
      // Handle error here, e.g. show an error message to the user
    }
    console.log("returning from function");
  };

  const editProfile = async (updatedData) => {
    console.log("Edit profile function called");
    try {
      const response = await axios.put("http://localhost:8000/updateUserInfo", updatedData);
      setBusinessData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(() => {
      console.log("handle saved is called");
      console.log("Form validation successful");
      const updatedData = form.getFieldsValue();
      editProfile(updatedData);
      console.log(updatedData);
      form.resetFields();
      setEditModalVisible(false);
    });
  };

  const handleTagClick = (url) => {
    window.open(url, "_blank");
  };

  const handleEditButtonClick = () => {
    setEditModalVisible(true);
  };

  const handleModalClose = () => {
    setEditModalVisible(false);
  };

  return (
    <div className="business-profile">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className="profile-image">
            <img src={businessData.logoImage} alt="Profile" />
          </div>
          <Divider className="border" />
          <h3>Follow Us</h3>
          <div className="social-links">
            <Space direction="vertical">
              <Tag icon={<TwitterOutlined />} style={{ cursor: "pointer" }} color="#55acee" onClick={() => handleTagClick(businessData.twitter)}>
                Twitter
              </Tag>
              <Tag icon={<YoutubeOutlined />} style={{ cursor: "pointer" }} color="#cd201f" onClick={() => handleTagClick(businessData.youtube)}>
                Youtube
              </Tag>
              <Tag icon={<FacebookOutlined />} style={{ cursor: "pointer" }} color="#3b5999" onClick={() => handleTagClick(businessData.facebook)}>
                Facebook
              </Tag>
              <Tag icon={<LinkedinOutlined />} style={{ cursor: "pointer" }} color="#55acee" onClick={() => handleTagClick(businessData.linkedIn)}>
                LinkedIn
              </Tag>
              <Tag icon={<InstagramOutlined />} style={{ cursor: "pointer" }} color="#e4405f" onClick={() => handleTagClick(businessData.instagram)}>
                Instagram
              </Tag>
            </Space>
          </div>
        </Col>

        <Col span={16}>
          <div className="header">
            <span>
              <Title level={3} style={{ marginRight: "16px" }}>
                {businessData.businessName}
              </Title>
              <p className="tagline">{businessData.businessTagline}</p>
            </span>
            <Button className="btnEdit" type="primary" icon={<EditOutlined />} onClick={handleEditButtonClick}>
              Edit
            </Button>
          </div>

          <Divider className="border" />
          <div className="business-description">
            <Title level={5}>About Us</Title>
            <p>{businessData.businessDescription}</p>
          </div>
          <Divider className="border" />
          <div className="business-info">
            <div className="info-row">
              <span className="info-label">Address: </span>
              <span className="info-value">{businessData.businessAddress}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone: </span>
              <span className="info-value">{businessData.bContactNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email: </span>
              <span className="info-value">{businessData.businessEmail}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Website: </span>
              <span className="info-value">www.business.com</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* modal  */}
      <Modal title="Edit Business Profile" visible={editModalVisible} onCancel={handleModalClose} footer={null} onOk={handleSave} okText="Save">
        <Divider className="border" />
        <Form
          form={form}
          initialValues={businessData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSave}
        >
          <Form.Item label="Name  " name="businessName">
            <Input />
          </Form.Item>
          <Form.Item label="Tagline  " name="businessTagline">
            <Input />
          </Form.Item>
          <Form.Item label="Address  " name="businessAddress">
            <Input />
          </Form.Item>
          <Form.Item label="Phone No  " name="bContactNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Description  " name="businessDescription">
            <TextArea rows={4} />
          </Form.Item>
          <Divider className="border" />
          <h5>Social Links</h5>
          <Space direction="vertical">
            <Input addonBefore={<FacebookOutlined />} placeholder="Facebook URL" name="facebook" />
            <Input addonBefore={<TwitterOutlined />} placeholder="Twitter URL" name="twitter" />
            <Input addonBefore={<InstagramOutlined />} placeholder="Instagram URL" namae="instagram" />
            <Input addonBefore={<LinkedinOutlined />} placeholder="LinkedIn URL" name="linkedIn" />
            <Input addonBefore={<YoutubeOutlined />} placeholder="YouTube URL" name="youtube" />
          </Space>
          <br />
          <br />
          <Form.Item label="Upload" name="logoImage" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Image </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit" onClick={handleSave}>
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
