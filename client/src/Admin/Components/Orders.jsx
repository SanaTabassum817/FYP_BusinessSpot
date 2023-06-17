import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Divider, Card, Typography } from "antd";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getAllOrders"); // Replace with your actual backend API endpoint
      setOrders(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteOrder/${orderId}`); // Replace with your actual backend API endpoint
      // Refresh the orders list after deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  useEffect(() => {
    // Fetch orders on component mount
    fetchOrders();
  }, []);

  const subColumns = [
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

  const dataSource = orders
    .filter((order) => Array.isArray(order.orders) && order.orders.length > 0)
    .map((order, index) => ({
      key: order._id,
      orderNumber: index + 1,
      orderSummary: order.orders.map((orderItem) => ({
        item: orderItem.products[0].product.name,
        image: orderItem.products[0].product.image,
        price: orderItem.products[0].price,
        quantity: orderItem.products[0].quantity,
        subtotal: orderItem.products[0].price * orderItem.products[0].quantity,
      })),
      shippingDetails: order.orders[0].shippingAddress,
      totalAmount: order.orders[0].totalAmount,
      shippingFee: order.orders[0].shippingFee,
    }));

  const renderOrderSummary = (text, record) => {
    const { orderSummary, totalAmount, shippingFee } = record;

    return (
      //   <Card>

      <Table
        dataSource={orderSummary}
        columns={subColumns}
        pagination={false}
        style={{ marginTop: "10px" }}
        footer={() => (
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
        )}
      />

      //   </Card>
    );
  };

  const renderShippingDetails = (text, record) => {
    const { shippingDetails } = record;

    return (
      <Card style={{ backgroundColor: "#bdbdbd" }}>
        {shippingDetails && (
          <>
            <p>
              <strong>Full Name: </strong> {shippingDetails.fullName}
            </p>
            <p>
              <strong>Email: </strong> {shippingDetails.email}
            </p>
            <p>
              <strong>Phone Number: </strong> {shippingDetails.phoneNumber}
            </p>
            <p>
              <strong>Address: </strong> {shippingDetails.address}
            </p>
            {/* Display other shipping details if available */}
          </>
        )}
        {/* Add more shipping details as needed */}
      </Card>
    );
  };

  const columns = [
    {
      title: "Order Summary",
      dataIndex: "orderSummary",
      key: "orderSummary",
      render: renderOrderSummary,
    },
    {
      title: "Shipping Details",
      dataIndex: "shippingDetails",
      key: "shippingDetails",
      render: renderShippingDetails,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => deleteOrder(record.key)} danger>
            Delete
          </Button>
          <Button type="primary" style={{ marginLeft: "10px", marginRight: "10px" }}>
            Send Confirmation
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Orders</h2>
      <div style={{ maxHeight: "100%", overflowY: "auto" }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
}
