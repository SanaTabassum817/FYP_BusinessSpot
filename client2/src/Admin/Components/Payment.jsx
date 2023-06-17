import React, {  useEffect } from "react";
import { Form, Button, Divider, Radio, Input ,message} from "antd";
import axios from "axios";
import "../../Shared/styles/PaymentPage.css"; // Import the CSS file for styling
import { useCartContext } from "../Context/cart_Context";
import ErrorPage from "./ErrorPage";

const PaymentPage = () => {
 
  const { cart, totalAmount, shippingFee, userData } = useCartContext();

  useEffect(() => {
    // Save user orders on component mount
    SaveUserOrders();
  }, []);

 
  const SaveUserOrders = async (paymentMethod) => {
    try {
      console.log("Sending request to save order at backend with data : ", cart, totalAmount + shippingFee, shippingFee, userData, paymentMethod);

      const response = await axios.post(
        "http://localhost:8000/saveOrders",
        { cart, totalAmount, shippingFee, userData, paymentMethod },
        { withCredentials: true }
      );
      console.log("Response from backend", response.data);
      if(response.data)
      {
        message.success("Your order is confirmed");
      }
     
    } catch (error) {
      console.log("Error occurred.", error);
    }
  };

  const onFinish = (values) => {
    console.log("Form values payment:", values);

    if (cart.length === 0) {
      message.warning("Your cart is empty. Please add items to your cart.");
      return;
    } 
    if (!userData.fullName || !userData.email || !userData.phoneNumber || !userData.address) {
      message.error("Please provide complete shipping details");
      return;
    }

    if (!values.paymentMethod) {
      message.error("Please select a payment method");
      return;
    }
  
    if (values.paymentMethod === "COD") {
      SaveUserOrders("COD");
    } else if (values.paymentMethod === "bankTransfer") {
      SaveUserOrders("bankTransfer");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-summary">
        <h3>Payment Summary</h3>
        <Divider />
        <h4>Shipping Details:</h4>
        <p>
          <strong>Full Name: </strong> {userData.fullName}
        </p>
        <p>
          <strong>Email: </strong> {userData.email}
        </p>
        <p>
          <strong>Phone Number: </strong> {userData.phoneNumber}
        </p>
        <p>
          <strong>Address: </strong> {userData.address}
        </p>
        {/* Display other shipping details if available */}
        <p>
          <strong>Total Amount: </strong> {totalAmount + shippingFee}
        </p>
        {/* Display other payment summary details if available */}
      </div>
      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <Divider />
        <Form onFinish={onFinish}>
          <Form.Item name="paymentMethod" initialValue="COD" rules={[{ required: true, message: "Please select a payment method" }]}>
            <Radio.Group>
              <Radio value="COD">Cash on Delivery</Radio>
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
                    <Form.Item label="Bank Name" name="bankName" rules={[{ required: true, message: "Please enter the bank name" }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Account Number" name="accountNumber" rules={[{ required: true, message: "Please enter the account number" }]}>
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
            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
              Confirm Order
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
