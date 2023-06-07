import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Divider, Select } from "antd";
import { useCartContext } from "../Context/cart_Context";
import axios from "axios";
import "../../Shared/styles/CheckoutPage.css"; // Import the CSS file for styling
import { NavLink } from "react-router-dom";

const { Option } = Select;

const CheckoutPage = () => {
  const { cart, totalAmount, shippingFee, userData, setUserData } = useCartContext();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log("Sending request to getUserInfo at backend");
      const response = await axios.get("http://localhost:8000/getUser", { withCredentials: true });
      console.log("Response from backend", response.data);

       setUserData({
        ...userData, // Preserve existing user data
        fullName: response.data.name,
        email: response.data.email,
        address: response.data.address,
        phoneNumber: response.data.contactNumber,
        city: response.data.city // Add the city field
      });

      console.log("UserData state", userData);
    } catch (error) {
      console.log("Error occurred.", error);
      console.error(error);
      // Handle error here, e.g., show an error message to the user
    }
    console.log("Returning from function");
  };
  const onCityChange = (value) => {
    setUserData({
      ...userData,
      city: value
    });
  };

  const onFinish = (values) => {
    // Process the form submission (e.g., place the order)
    console.log("Form values:", values);
    setUserData(values);
    console.log("onFinish values", values);
    // Call your backend API to process the order

    // Reset the cart and navigate to a success page or display a success message
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (text, record) => (
        <div>
          <img src={record.image} alt={text} className="item-image" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];

  const dataSource = cart.map((item) => ({
    key: item.id,
    item: item.name,
    image: item.image,
    price: item.price,
    quantity: item.amount,
    subtotal: item.price * item.amount,
  }));

  return (
    <div className="checkout-page">
      <div className="checkout-summary">
        <h3 style={{marginTop:"13px",textAlign:"center"}}>Order Summary</h3>
        <Divider />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          summary={() => (
            <>
              <Table
                size="small"
                dataSource={[
                  { label: <b>Sub Total</b>, value: totalAmount },
                  { label: <b>Shipping Fee</b>, value: shippingFee },
                  { label: <b>Final Total</b>, value: totalAmount + shippingFee },
                ]}
                columns={[
                  { title: "Label", dataIndex: "label", key: "label" },
                  { title: "Value", dataIndex: "value", key: "value" },
                ]}
                pagination={false}
                showHeader={false}
              />
            </>
          )}
        />
      </div>
      <div className="checkout-form">
        <h3 style={{marginTop:"13px",textAlign:"center"}}>Checkout Details</h3>
        <Divider />
        <Form onFinish={onFinish} initialValues={userData}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
            className="form-item"
            style={{ marginBottom: "5px" }}
          >
            <Input style={{ width: "80%" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
            className="form-item"
            style={{ marginBottom: "5px" }}
          >
            <Input style={{ width: "80%" }} />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter your phone number" }]}
            className="form-item"
            style={{ marginBottom: "5px" }}
          >
            <Input style={{ width: "80%" }} />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select your country" }]}
            className="form-item"
            style={{ marginBottom: "5px" }}
          >
            <Select style={{ width: "80%" }}>
              <Option value="usa">Pakistan</Option>
              {/* Add other countries here */}
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please select your city" }]}
            className="form-item"
            style={{ marginBottom: "5px" }}
           
          >
            <Select  onChange={onCityChange} style={{ width: "80%" }}>
              {/* Render city options based on the selected country */}
              {/* Example options */}
              <Option value="karachi">Karachi</Option>
              <Option value="lahore">Lahore</Option>
              {/* Add other cities here */}
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
            className="form-item"
            style={{ marginBottom: "5px" }}
          >
            <Input.TextArea rows={4} style={{ width: "80%" }} />
          </Form.Item>
          <Form.Item>
            <NavLink to="/payment">
              <Button type="primary" htmlType="submit" style={{marginLeft:"310px",marginTop:"10px"}} >
                Continue Payment
              </Button>
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
