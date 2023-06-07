import React from "react";
import { Table, Button, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCartContext } from "../Context/cart_Context";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink, Navigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeItem, clearCart, setDecrease, setIncrease, totalAmount, shippingFee } = useCartContext();

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
        <CartAmountToggle amount={record.quantity} setDecrease={() => setDecrease(record.key)} setIncrease={() => setIncrease(record.key)} />
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
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeItem(record.key)}>
          Remove
        </Button>
      ),
    },
  ];

  const dataSource = cart.map((item) => ({
    key: item.id, // Use item.id as the key value
    item: item.name,
    price: item.price,
    quantity: item.amount,
    image: item.image,
  }));

  const finalTotal = totalAmount + shippingFee; // Calculate the final total

  return (
    <>
      <div style={{ padding: "16px", width: "100%", marginLeft:"20px" ,marginRight:"20px", overflowY: "auto" }}>
        <h2 style={{textAlign:"center",marginBottom:"20px"}}>Cart</h2>
        <Table dataSource={dataSource} columns={columns} rowKey="key"  pagination={false} />

        <Divider />
        <div style={{ marginBottom: "16px" }}>
          <NavLink to="/categories/:categoryName">
            <Button type="primary">Continue Shopping</Button>
          </NavLink>
          <Button type="primary" danger onClick={clearCart} style={{ marginLeft: "10px" }}>
            Clear Cart
          </Button>
        </div>

        <div
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            marginTop: "10px",
            marginRight:"20px"
          }}
        >
          <Table
            size="small"
            dataSource={[
              { label: <b>Sub Total</b>, value: totalAmount },
              { label: <b>Shipping Fee</b>, value: shippingFee },
              { label: <b>Final Total</b>, value: finalTotal }, // Add a new row for
            ]}
            columns={[
              { title: "Label", dataIndex: "label", key: "label" },
              { title: "Value", dataIndex: "value", key: "value" },
            ]}
            pagination={false}
            showHeader={false}
          />
          <br />
          <NavLink to="/checkout">
            <Button type="primary" style={{ marginLeft: "5px" }}>
              Checkout
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CartPage;
