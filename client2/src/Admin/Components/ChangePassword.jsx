import React, { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Form, Input, Button, Layout, FloatButton, message } from "antd";
import validator from "validator";
import "../../Shared/styles/authForm.css";
import HeaderAuth from "./HeaderAuth";
import FooterAuth from "./Footer";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ChangePassword = () => {
  const { userId, resetPasswordToken } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onSubmitEventHandler = async (values) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/changePassword/${resetPasswordToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.msg) {
        message.success(jsonResponse.msg);
        navigate(`/login?msg=${jsonResponse.msg}`);
      } else {
        message.error(jsonResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatePassword = (_, value) => {
    if (validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a strong password with at least 8 characters, one uppercase letter, one number, and one special character");
  };

  const validateConfirmPassword = (_, value) => {
    const { getFieldValue } = form;
    if (value === getFieldValue("password")) {
      return Promise.resolve();
    }
    return Promise.reject("Passwords do not match");
  };

  return (
    <Layout className="layout">
      <HeaderAuth />
      <div className="row center-row" style={{ backgroundColor: "white" }}>
        <div className="column d1c">
          <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ left: 25 }} />
        </div>
        <div className="column">
          <div className="card">
            <div className="quote">
              <h4 className="quote">Welcome</h4>
              <span>We exist to make entrepreneurship easier.</span>
            </div>
            <div className="card-body py-5 px-md-5">
              <Form form={form} onFinish={onSubmitEventHandler}>
                <header className="card-heading">Reset Password</header>
                <Form.Item name="password" rules={[{ required: true, message: "Please enter a password" }, { validator: validatePassword }]}>
                  <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Enter a strong password" />
                </Form.Item>
                <Form.Item
                  name="cPassword"
                  rules={[{ required: true, message: "Please confirm your password" }, { validator: validateConfirmPassword }]}
                >
                  <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Confirm your password" />
                </Form.Item>
                <div className="text-center text-lg-start pt-2">
                  <Button type="primary" htmlType="submit" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                    Change Password
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="medium fw-bold mt-2 pt-1 mb-0">
                    Back to login?{" "}
                    <NavLink to="/login" className="link-danger">
                      &nbsp; Login
                    </NavLink>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <FooterAuth />
    </Layout>
  );
};

export default ChangePassword;
