const pool = require("../db");

const getOrder = async (phone) => {
  const { rows } = await pool.query('SELECT * FROM CustomerOrders INNER JOIN customers ON customers.customer_id = CustomerOrders.customer_id WHERE customers.phone = $1', [phone]);
    return rows;
}

const addOrder = async (orderData) => {
    const { phone, total_amount, items, tenant_id } = orderData;
    const { rows } = await pool.query('SELECT * FROM customers WHERE phone = $1', [phone]);
    const customer_id = await rows[0].customer_id;
    
    try {
      const query = `
        INSERT INTO CustomerOrders (customer_id, total_amount, items, tenant_id)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [customer_id, total_amount, items, tenant_id];
      await pool.query(query, values);
      return { success: true };
    } catch (error) {
      console.error('Error adding order:', error.message);
      return { success: false, error: 'Internal Server Error' };
    }
  };

  const updateOrder = async (orderUpdatedData) => {
    const {order_id, items, total_amount} = orderUpdatedData;
    try {
        const query = 'UPDATE CustomerOrders SET items = $1, total_amount=$2 WHERE order_id = $3';
        const values = [items,total_amount, order_id];
        await pool.query(query, values);
        return { success: true };
    } catch (error) {
        console.error('Error updating order', error.message);
        return { success: false, error: 'Internal Server Error' };
    }
  };


  const deleteOrder = async(order_id) =>{
    await pool.query('DELETE FROM CustomerOrders WHERE order_id = $1', [order_id]);
  }


module.exports = {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder
};