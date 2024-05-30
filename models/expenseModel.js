const pool = require("../db");

const getAllExpenses = async() => {
    const { rows } = await pool.query('SELECT * FROM expenses');
    return rows;
}


const addExpenses = async (expenseData) => {
    const { description, amount, expense_type, tenant_id } = expenseData;
  
    try {
      const query = `
        INSERT INTO Expenses ( description, amount, expense_type, tenant_id)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [description, amount, expense_type, tenant_id];
      await pool.query(query, values);
      return { success: true };
    } catch (error) {
      console.error('Error adding expenses:', error.message);
      return { success: false, error: 'Internal Server Error' };
    }
  };

  const updateExpense = async (updatingData) =>{
    const { expense_id,description, amount, expense_type} = updatingData;
    try {
        const query = `
        UPDATE expenses
        SET 
            description = COALESCE($1, description),
            amount = COALESCE($2, amount),
            date = CURRENT_TIMESTAMP,
            expense_type = COALESCE($3, expense_type)
        WHERE 
            expense_id = $4;
        `;
        const values = [description, amount, expense_type, expense_id];
        await pool.query(query, values);
        return { success: true };
      } catch (error) {
        console.error('Error updateing expenses:', error.message);
        return { success: false, error: 'Internal Server Error' };
      }
    
  }
  const deleteExpense = async(expenseData) =>{
    const {expense_id} = expenseData;
    await pool.query('DELETE FROM expenses WHERE expense_id = $1', [expense_id]);
  }
// async function updateExpense(id, description, amount, date) {
//     await pool.query('UPDATE expenses SET description = $1, amount = $2, date = $3 WHERE id = $4', [description, amount, date, id]);
// }


module.exports = {
    getAllExpenses,
    addExpenses,
    updateExpense,
    deleteExpense,
};