const pool = require("../db");

const getCustomerLoyaltyTransactionsData = async(customer_id) => {
    const { rows } = await pool.query('SELECT * FROM CustomerLoyaltyTransactions WHERE customer_id = $1', [customer_id]);
    return rows;
}

const addCustomerLoyaltyTransactions = async (CustomerLoyaltyTransactionsData) => {
    const {customer_id, points, type, tenant_id } = CustomerLoyaltyTransactionsData;
  
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