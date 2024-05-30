const pool = require("../db"); 

const getCustomer = async (customer_id) => {
  const { rows } = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [customer_id]);
  return rows;
}

const addCustomer = async (customerData) => {
  const { first_name, last_name, email, phone, address, loyalty_points, tenant_id } = customerData;

  try {
    const query = `
      INSERT INTO Customers (first_name, last_name, email, phone, address, loyalty_points, tenant_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [first_name, last_name, email, phone, address, loyalty_points, tenant_id];
    await pool.query(query, values);
    return { success: true };
  } catch (error) {
    console.error('Error adding customer:', error.message);
    return { success: false, error: 'Internal Server Error' };
  }
};

const updateCustomerDetails = async (customerUpdatedData) => {
  const {customer_id, phone} = customerUpdatedData;
  try {
      const query = 'UPDATE customers SET phone = $1 WHERE customer_id = $2';
      const values = [phone, customer_id];
      await pool.query(query, values);
      return { success: true };
  } catch (error) {
      console.error('Error updating customer phone_number', error.message);
      return { success: false, error: 'Internal Server Error' };
  }
};

module.exports = { addCustomer, getCustomer,updateCustomerDetails };
