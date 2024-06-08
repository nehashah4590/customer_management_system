import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCustomersDetails = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
      // Fetch customer data from the backend
      axios.get(`${process.env.REACT_APP_API_HOST}/expenses`)
        .then(response => {
            setData(response.data);
            console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    }, []);
  

    const updateDetails =async (expenseId) => {
      // Make API request to update phone number
      console.log(expenseId)
      axios.put(`${process.env.REACT_APP_API_HOST}/expenses`, { 
        expense_type:type , 
        description:description, 
        amount:amount,
        expense_id: expenseId})
        .then(response => {
          // Update local state with updated customer data
          console.log(response);
          
        })
        .catch(error => {
          console.error('Error updating phone number:', error);
        });
    };
    const deleteExpense = async(expenseId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/expenses?expense_id=${expenseId}`);
            console.log('Order deleted successfully:', response.data);
            const updatedData = data.filter(order => order.expense_id !== expenseId);
             setData(updatedData);
          } catch (error) {
            console.error('There was an error deleting the order!', error);
            // Handle the error accordingly
          }
        
    };
    
    return (
      <div className='mb-4 m-10'>
        <h1 className="text-2xl font-bold ">Expenses Details</h1>
        <div className="">
            <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>ExpenseID</p>
                <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Date</p>
                <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Description</p>
                <p className='w-[150px] bg-gray-200 rounded-md px-4 py-2'>Type</p>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>Total</p>
            </div>
          {data?.map(ExpenseData => (
            <div key={ExpenseData.expense_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
              <div className='w-[100px] overflow-x-auto'>{ExpenseData.expense_id} </div>
              <div className='w-[200px] overflow-x-auto'>{ExpenseData.date} </div>
              <input className='w-[200px] overflow-x-auto text-center cursor-pointer' defaultValue={ExpenseData.description} type='text' onChange={(e)=>setDescription(e.target.value)}/>
              <input className='w-[150px] overflow-x-auto text-center cursor-pointer' defaultValue={ExpenseData.expense_type} type='text' onChange={(e)=>setType(e.target.value)}/>
              <input className='w-[100px] overflow-x-auto text-center cursor-pointer' defaultValue={ExpenseData.amount} type='text' onChange={(e)=>setAmount(e.target.value)}/>
              <button onClick={() => updateDetails(ExpenseData.expense_id)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-green-400">Update</button>
              <button onClick={() => deleteExpense(ExpenseData.expense_id)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400">Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UpdateCustomersDetails
