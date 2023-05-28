import React from "react";
import { Table, Button, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCartContext } from "../Context/cart_Context";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const { cart, removeItem, clearCart } = useCartContext();

  const handleRemove = (productId) => {
    removeItem(productId);
  };

  const handleDecrease = (productId) => {
    // Logic to decrease the quantity of the product
  };

  const handleIncrease = (productId) => {
    // Logic to increase the quantity of the product
  };

  const columns = [
    {
        title: "Item",
        dataIndex: "item",
        key: "item",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={record.image} alt={record.item} style={{ marginRight: "8px", height: "40px" }} />
            <span>{record.item}</span>
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
      render: (_, record) => (
        <CartAmountToggle
          amount={record.quantity}
          setDecrease={() => handleDecrease(record.key)}
          setIncrease={() => handleIncrease(record.key)}
        />
      ),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (_, record) => record.price * record.quantity,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.key)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const dataSource = cart.map((item) => ({
    key: item.id,
    item: item.name,
    price: item.price,
    quantity: item.amount,
  }));

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // Logic for handling the checkout process
  };

  // Calculate total amount and shipping fee
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  const shippingFee = 5000;

  return (
    <>
      <div style={{ padding: "16px", width: "100%", overflowY: "auto" }}>
        <h1>Cart</h1>
        <Table dataSource={dataSource} columns={columns} rowKey="key" />
        <Divider />
        <div style={{ marginBottom: "16px" }}>
          <NavLink to="/categories/:categoryName">
            <Button type="primary">Continue Shopping</Button>
          </NavLink>
          <Button
            type="primary"
            danger
            onClick={handleClearCart}
            style={{ marginLeft: "10px" }}
          >
            Clear Cart
          </Button>
        </div>
       
        <div style={{ position: "fixed", bottom: "16px", right: "16px", marginTop: "10px" }}>
          <Table
            size="small"
            dataSource={[
              { label: "Total Amount", value: totalAmount },
              { label: "Shipping Fee", value: shippingFee },
            ]}
            columns={[
              { title: "Label", dataIndex: "label", key: "label" },
              { title: "Value", dataIndex: "value", key: "value" },
            ]}
            pagination={false}
            showHeader={false}
          />
          <br />
          <Button
            type="primary"
            onClick={handleCheckout}
            style={{ marginLeft: "5px" }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
