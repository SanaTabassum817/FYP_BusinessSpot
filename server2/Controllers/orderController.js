const Order = require("../Models/Order");
const saveOrders = async (req, res) => {
  try {
    const { userId, cart, paymentMethod, totalAmount, shippingFee, userData } = req.body;

    const orderItems = cart.map((item) => ({
      products: [
        {
          product: item.id,
          quantity: item.amount,
          price: item.price,
        },
      ],
      shippingAddress: {
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        city: userData.city,
        // Add more shipping details as needed
      },
      paymentMethod: paymentMethod,
      shippingFee: shippingFee,
      totalAmount: totalAmount,
    }));

    const newOrder = new Order({
      user: userId,
      orders: orderItems,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Orders saved successfully", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  saveOrders,

};
