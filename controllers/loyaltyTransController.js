const loyaltyTransModel = require('../models/loyaltyTransModel');

// storing data coming from frontend
const addCustomerLoyaltyTransactions = async (req, res) => {
    const CustomerLoyaltyTransactionsData = req.body;
  
    try {
      const result = await loyaltyTransModel.addCustomerLoyaltyTransactions(CustomerLoyaltyTransactionsData);
      if (result.success) {
        res.status(201).json({ message: 'Customer Loyalty Transactions Data added successfully' });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error adding Customer Loyalty TransactionsData:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getCustomerLoyaltyTransactionsData = async (req, res) => {
   const phone = req.query.phone;

  try {
    const data = await loyaltyTransModel.getCustomerLoyaltyTransactionsData(phone);
    res.json(data);
} catch (error) {
    console.error('Error fetching Customer Loyalty TransactionsData', error);
    res.status(500).send('Internal Server Error');
}
};

const deleteCustomerLoyaltyTransactions = async (req, res) => {
  const transaction_id = req.query.transaction_id;
    try {
      await loyaltyTransModel.deleteCustomerLoyaltyTransactions(transaction_id);
      res.send('Customer loyalty transaction deleted successfully');
  } catch (error) {
      console.error('Error deleting data', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = { addCustomerLoyaltyTransactions, getCustomerLoyaltyTransactionsData, deleteCustomerLoyaltyTransactions};
