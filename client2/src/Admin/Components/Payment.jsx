import React, { useState, useEffect } from "react";
import { Form, Button, Divider, Radio, Input } from "antd";
import axios from "axios";
import "../../Shared/styles/PaymentPage.css"; // Import the CSS file for styling
import { useCartContext } from "../Context/cart_Context";

const PaymentPage = () => {
  const [buttonText, setButtonText] = useState("Pay Now");
  const { cart, totalAmount, shippingFee, userData } = useCartContext();

  useEffect(() => {
    // Save user orders on component mount
    SaveUserOrders();
  }, []);

  const SaveUserOrders = async (paymentMethod) => {
    try {
      console.log("Sending request to save order at backend with data : ",cart,totalAmount+shippingFee,shippingFee,userData,paymentMethod);
      
      const response = await axios.post(
        "http://localhost:8000/saveOrders",
        { cart, totalAmount, shippingFee, userData, paymentMethod },
        { withCredentials: true }
      );
      console.log("Response from backend", response.data);
     
    } catch (error) {
      console.log("Error occurred.", error);
     
    }
   
  };

  const onFinish = (values) => {
    console.log("Form values payment:", values);
   

    if (values.paymentMethod === "cashOnDelivery") {
      setButtonText("Confirm Order");
      SaveUserOrders("COD");
    } else if (values.paymentMethod === "bankTransfer") {
      setButtonText("Pay Now");
      SaveUserOrders("bankTransfer");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-summary">
        <h3>Payment Summary</h3>
        <Divider />
        <p>Shipping Details:</p>
        <p>
          <strong>Full Name:</strong> {userData.fullName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userData.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {userData.address}
        </p>
        {/* Display other shipping details if available */}
        <p>Order Total: $100.00</p>
        {/* Display other payment summary details if available */}
      </div>
      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <Divider />
        <Form onFinish={onFinish}>
          <Form.Item
            name="paymentMethod"
            initialValue="cashOnDelivery"
            rules={[{ required: true, message: "Please select a payment method" }]}
          >
            <Radio.Group>
              <Radio value="cashOnDelivery">Cash on Delivery</Radio>
              <Radio value="bankTransfer">Bank Transfer</Radio>
              {/* Add more payment method options here */}
            </Radio.Group>
          </Form.Item>
          <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.paymentMethod !== currentValues.paymentMethod}>
            {({ getFieldValue }) => {
              const paymentMethod = getFieldValue("paymentMethod");

              // Render additional form fields based on the selected payment method
              if (paymentMethod === "bankTransfer") {
                return (
                  <>
                    <Form.Item
                      label="Bank Name"
                      name="bankName"
                      rules={[{ required: true, message: "Please enter the bank name" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account Number"
                      name="accountNumber"
                      rules={[{ required: true, message: "Please enter the account number" }]}
                    >
                      <Input />
                    </Form.Item>
                    {/* Add more bank transfer fields if necessary */}
                  </>
                );
              }

              // Render additional form fields for other payment methods

              return null;
            }}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
