const Order = require("../Models/Order");
const mongoose = require("mongoose")
// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get orders from the database.");
  }
};

// delete order
const deleteOrder = async (req, res) => {
  console.log(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid product ID');
  }
 
  try {
    const deletedOrder = await Order.findByIdAndRemove(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send("Order not found");
    }
   res.send(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete the order");
  }
};

module.exports = { getAllOrders, deleteOrder };
