const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  orders: [
    {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          }
        }
      ],
      shippingAddress: {
        fullName: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        phoneNumber: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        }
        // Add more shipping details as needed
      },
      paymentMethod: {
        type: String,
        enum: ["COD", "bankTransfer"], // Add more payment methods if necessary
        required: true
      },
      shippingFee: {
        type: Number,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
