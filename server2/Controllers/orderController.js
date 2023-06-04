const Order = require('../Models/Order');

// Get order details by order ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('user', 'fullName email'); // Populate user details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order details by user ID
const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const saveOrders = async (req, res) => {
    try {
      const { userId, cart, paymentMethod, totalAmount, shippingFee, userData } = req.body;
  
      const orderItems = cart.map((item) => ({
        products: [
          {
            product: item.id,
            quantity: item.amount,
            price: item.price
          }
        ],
        shippingAddress: {
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
            city: userData.city
          // Add more shipping details as needed
        },
        paymentMethod: paymentMethod,
        shippingFee: shippingFee,
        totalAmount: totalAmount
      }));
  
      const newOrder = new Order({
        user: userId,
        orders: orderItems
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json({ message: 'Orders saved successfully', order: savedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {
  saveOrders,
  getOrderById,
  getOrderByUser
};
