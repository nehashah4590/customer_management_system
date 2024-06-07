const pool = require("../db");

const getCustomerLoyaltyTransactionsData = async(phone) => {
  const { rows } = await pool.query('SELECT * FROM CustomerLoyaltyTransactions INNER JOIN customers ON customers.customer_id = CustomerLoyaltyTransactions.customer_id WHERE customers.phone = $1', [phone]);
    return rows;
}

const addCustomerLoyaltyTransactions = async (CustomerLoyaltyTransactionsData) => {
    const {phone, points, type, tenant_id } = CustomerLoyaltyTransactionsData;
    const { rows } = await pool.query('SELECT * FROM customers WHERE phone = $1', [phone]);
    const customer_id = await rows[0].customer_id;
    
    try {
      const query = `
        INSERT INTO CustomerLoyaltyTransactions (customer_id, points, type, tenant_id)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [customer_id, points, type, tenant_id];
      await pool.query(query, values);
      return { success: true };
    } catch (error) {
      console.error('Error adding Customer Loyalty TransactionsData:', error.message);
      return { success: false, error: 'Internal Server Error' };
    }
  };

  
  const deleteCustomerLoyaltyTransactions = async(transaction_id) =>{
    
    await pool.query('DELETE FROM CustomerLoyaltyTransactions WHERE transaction_id = $1', [transaction_id]);
  }


module.exports = {
    getCustomerLoyaltyTransactionsData,
    addCustomerLoyaltyTransactions,
    deleteCustomerLoyaltyTransactions,
};