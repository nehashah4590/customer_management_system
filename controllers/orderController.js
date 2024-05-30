const orderModel = require('../models/orderModel');

// storing data coming from frontend
const addOrder = async (req, res) => {
  const orderData = req.body;

  try {
    const result = await orderModel.addOrder(orderData);
    if (result.success) {
      res.status(201).json({ message: 'Order added successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error adding order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrder = async (req, res) => {
  const {order_id} = req.body;
  try {
    const order = await orderModel.getOrder(order_id);
    res.json({ orderData: order });
} catch (error) {
    console.error('Error fetching expenses', error);
    res.status(500).send('Internal Server Error');
}
};

const updateOrder = async (req, res) =>{
  const orderUpdatedData = req.body;
  try {
    const result = await orderModel.updateOrder(orderUpdatedData);
    if (result.success) {
      res.status(201).json({ message: 'Customer order updated successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error updating order details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

const deleteOrder = async (req, res) => {
  const {order_id} = req.body;

  try {
    const result = await orderModel.deleteOrder(order_id);
    if (result) {
      res.status(201).json({ message: 'Order deleted successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addOrder, getOrder, deleteOrder, updateOrder};
