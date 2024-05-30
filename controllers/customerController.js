const customerModel = require('../models/customerModel');

const addCustomer = async (req, res) => {
  const customerData = req.body;

  try {
    const result = await customerModel.addCustomer(customerData);
    if (result.success) {
      res.status(201).json({ message: 'Customer added successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error adding customer:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getCustomer = async (req, res) =>{
  const {customer_id} = req.body;
  try {
    const result = await customerModel.getCustomer(customer_id);
    if (result) {
      res.status(201).json({ customerData: result });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error getting customer data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

const updateCustomerDetails = async (req, res) =>{
  const customerUpdatedData = req.body;
  try {
    const result = await customerModel.updateCustomerDetails(customerUpdatedData);
    if (result.success) {
      res.status(201).json({ message: 'Customer phone number is updated successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error updating customer details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


module.exports = { addCustomer, getCustomer, updateCustomerDetails};