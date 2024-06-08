const pool = require("../db");

const getLoyaltyPrograms = async() => {
    const { rows } = await pool.query('SELECT * FROM LoyaltyPrograms');
    return rows;
}


const addLoyaltyProgram = async (loyalty_Programs_Data) => {
    const { name, description, points_per_dollar } = loyalty_Programs_Data;
  
    try {
      const query = `
        INSERT INTO LoyaltyPrograms (  name, description, points_per_dollar)
        VALUES ($1, $2, $3)
      `;
      const values = [ name, description, points_per_dollar];
      await pool.query(query, values);
      return { success: true };
    } catch (error) {
      console.error('Error adding Loyalty Programs:', error.message);
      return { success: false, error: 'Internal Server Error' };
    }
  };

  const updateLoyaltyProgram = async (loyalty_Programs_updateData) =>{
    const {program_id,  name, description, points_per_dollar } = loyalty_Programs_updateData;
    try {
      if(name){
        const query = 'UPDATE LoyaltyPrograms SET name = $1 WHERE program_id = $2';
        const values = [name, program_id];
        await pool.query(query, values);
        return { success: true };
      }
      else if(description){
        const query = 'UPDATE LoyaltyPrograms SET description = $1 WHERE program_id = $2';
        const values = [description, program_id];
        await pool.query(query, values);
        return { success: true };
      }else if(points_per_dollar){
        const query = 'UPDATE LoyaltyPrograms SET points_per_dollar = $1 WHERE program_id = $2';
        const values = [points_per_dollar, program_id];
        await pool.query(query, values);
        return { success: true };
      }
      
      } catch (error) {
        console.error('Error updateing loyalty program data:', error.message);
        return { success: false, error: 'Internal Server Error' };
      }
    
  }
  const deleteLoyaltyProgram = async(program_id) =>{
  
   try{
    if (program_id) {   
      await pool.query('DELETE FROM LoyaltyPrograms WHERE program_id = $1', [program_id]);
      return { success: true };
  } else {
    console.log('Program ID is required.');
  }
  }catch (error) {
    console.error('Error deleting Loyalty Programs:', error.message);
    return { success: false, error: 'Internal Server Error' };
  }
}


module.exports = {
    getLoyaltyPrograms,
    addLoyaltyProgram,
    updateLoyaltyProgram,
    deleteLoyaltyProgram,
};