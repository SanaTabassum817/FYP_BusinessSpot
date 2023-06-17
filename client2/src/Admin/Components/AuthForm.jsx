
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Shared/styles/authForm.css";
import { Form, Input, Button, Tabs, message,Layout,FloatButton ,Alert} from "antd";
import HeaderAuth from "./HeaderAuth";
import FooterAuth from "./Footer"
import { QuestionCircleOutlined } from '@ant-design/icons';



const { TabPane } = Tabs;

const AuthForm = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const validateLoginForm = () => {
    const errors = {};
    const formValues = form.getFieldsValue();
    if (!formValues.email) {
      errors.email = "Please enter a valid email";
    }
    if (!formValues.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  const validateSignupForm = () => {
    const errors = {};
    const formValues = form.getFieldsValue();
    if (!formValues.name) {
      errors.name = "Please enter your full name";
    }
    if (!formValues.email) {
      errors.email = "Please enter a valid email";
    }
    if (!formValues.password) {
      errors.password = "Please enter a password";
    }
    if (formValues.password !== formValues.cPassword) {
      errors.cPassword = "Passwords do not match";
    }
    return errors;
  };

  const onLoginSubmitEventHandler = async () => {
    try {
      const errors = validateLoginForm();
      if (Object.keys(errors).length > 0) {
        form.setFields(errors);
        return;
      }
      const formValues = form.getFieldsValue();
      console.log("forms data login", formValues);
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formValues),
      });
      const jsonResponse = await response.json();

      if (jsonResponse._id) {
        message.success("Login successful");
        navigate("/");
      } else {
        message.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSignupSubmitHandler = async () => {
    try {
      const errors = validateSignupForm();
      if (Object.keys(errors).length > 0) {
        form.setFields(errors);
        return;
      }
      const formValues = form.getFieldsValue();
      console.log("forms data signup", formValues);
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        setSignupError(jsonResponse.error);
      } else {
        setSignupSuccess(jsonResponse.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout className="layout">
     <HeaderAuth />
     {signupError && (
        <Alert
          message="Sign Up Failed"
          description={signupError}
          type="error"
          showIcon
        />
      )}
      
      {signupSuccess && (
        <Alert
          message="Sign Up Successful"
          description={signupSuccess}
          type="success"
          showIcon
        />
      )}

       
        <div className="row center-row" style={{backgroundColor:"white"}}>
          <div className="column d1">
            <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ left: 25 }} />
          </div>
          <div className="column">
          
          <div className="card">
          <div className="quote">
            <h4 className="quote">Welcome</h4>
            <span>We exist to make entrepreneurship easier.</span>
          </div>
          <div className="card-body py-5 px-md-5">
            <Tabs defaultActiveKey="login" centered>
              <TabPane tab="Login" key="login" className="card-heading mb-1">
                <Form form={form} onFinish={onLoginSubmitEventHandler}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter a valid email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input prefix={<i className="fas fa-envelope" />} placeholder="Enter a valid email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter a password" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long",
                      },
                    ]}
                  >
                    <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Enter 8 digit password" />
                  </Form.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button type="primary" htmlType="submit" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", marginLeft: 0 }}>
                      Login
                    </Button>
                    <p className="medium fw-bold mt-2 pt-1 mb-0">
                      Forget Password?&nbsp;
                      <NavLink to="/forgetPassword" className="link-danger">
                        Forget
                      </NavLink>
                    </p>
                  </div>
                </Form>
              </TabPane>
              <TabPane tab="Signup" key="signup">
                <div className="card-body py-5 px-md-5">
                  <Form form={form} onFinish={onSignupSubmitHandler}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Please enter your full name" }]}
                    >
                      <Input prefix={<i className="fas fa-user" />} placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Please enter a valid email" },
                        { type: "email", message: "Please enter a valid email" },
                      ]}
                    >
                      <Input prefix={<i className="fas fa-envelope" />} placeholder="Enter a valid email" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Please enter a password" },
                        {
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long",
                        },
                      ]}
                    >
                      <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Enter 8 digit password" />
                    </Form.Item>
                    <Form.Item
                      name="cPassword"
                      rules={[
                        { required: true, message: "Please enter confirm password" },
                        {
                          validator: (_, value) => {
                            const { getFieldValue } = form;
                            if (value && value !== getFieldValue("password")) {
                              return Promise.reject("Passwords do not match");
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input.Password prefix={<i className="fas fa-lock" />} placeholder="Enter confirm password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button type="primary" htmlType="submit" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                        Signup
                      </Button>
                    </div>
                  </Form>
                </div>
              </TabPane>
            </Tabs>
          </div>
          </div>
        </div>
        </div>
        <FooterAuth />
      
      </Layout>
  );
};

export default  AuthForm ;