import React, { useState } from "react";
import { Form, Input, Button, Layout, message } from "antd";
import { NavLink } from "react-router-dom";
import "../../Shared/styles/authForm.css";
import HeaderAuth from "./HeaderAuth";
import FooterAuth from "./Footer";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ForgetPassword = (props) => {
  const [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:8000/forgetPassword", {
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
        setIsSuccess(true);
      } else {
        message.error(jsonResponse.error);
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout className="layout">
        <HeaderAuth />
        <div className="row center-row" style={{ backgroundColor: "white" }}>
          <div className="column d1f">
            <Button icon={<QuestionCircleOutlined />} type="primary" style={{ left: 25 }} />
          </div>
          <div className="column">
            <div className="card">
              <div className="quote">
                <h4 className="quote">Welcome</h4>
                <span>We exist to make entrepreneurship easier.</span>
              </div>
              <div className="card-body py-5 px-md-5">
                <Form form={form} onFinish={onFinish}>
                  <header className="card-heading">Forget Password</header>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter a valid email address" },
                      { type: "email", message: "Please enter a valid email address" },
                    ]}
                    hasFeedback
                    validateStatus={isSuccess ? "success" : ""}
                  >
                    <Input prefix={<i className="fas fa-envelope" />} placeholder="Enter a valid email" />
                  </Form.Item>
                  <div className="text-center text-lg-start pt-2">
                    <Button type="primary" htmlType="submit" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                      Send Email
                    </Button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="medium fw-bold mt-2 pt-1 mb-0">
                      Back to login?{" "}
                      <NavLink to="/login" className="link-danger">
                        {" "}
                        Login
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
    </>
  );
};

export default ForgetPassword;
