import { useState } from 'react';
import axios from 'axios';

const GetData = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [item, setItem] = useState('');
    const [phone, setPhone] = useState('');
    const [total, setTotal] = useState('');

    const handleSubmit =async(e) => {
        e.preventDefault();
        console.log(phone)
      // Fetch customer data from the backend
      await axios.get(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions?phone=${phone}`)
        .then(response => {
            setTransactionData(response.data);
            console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    }
  
    const deleteData = async(transactionId) => {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions?transaction_id=${transactionId}`);
            console.log('Order deleted successfully:', response.data);
            const updatedData = transactionData.filter(data => data.transaction_id !== transactionId);
            setTransactionData(updatedData);
          } catch (error) {
            console.error('There was an error deleting the order!', error);
            // Handle the error accordingly
          }
        
    };
  
    return (
      <div className='mb-4 m-10'>
        <form onSubmit={handleSubmit}>
        <div className="mb-4 w-[300px] flex space-x-2">
          <input
            type="text"
            id="phone"
            placeholder="Enter customer phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="w-[80%] px-4 py-1 mt-1 bg-blue-900 text-white rounded-md shadow-sm hover:bg-green-400"
          >
            Submit
          </button>
        </div>  
        </form>
        <h1 className="text-2xl font-bold ">Customer Loyalty Transactions Details</h1>
        <div className="">
            <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>TransactionID</p>
                <p className='w-[110px] bg-gray-200 rounded-md px-4 py-2'>CustomerID</p>
                <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Date</p>
                <p className='w-[150px] bg-gray-200 rounded-md px-4 py-2'>Points</p>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>Type</p>
            </div>
          {transactionData?.map(Data => (
            <div key={Data.transaction_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
              <div className='w-[100px] overflow-x-auto'>{Data.transaction_id} </div>
              <div className='w-[110px] overflow-x-auto'>{Data.customer_id} </div>
              <div className='w-[200px] overflow-x-auto'>{Data.date} </div>
              <input className='w-[150px] overflow-x-auto text-center' defaultValue={Data.points} type='text' onChange={(e)=>setItem(e.target.value)}/>
              <input className='w-[100px] overflow-x-auto text-center' defaultValue={Data.type} type='text' onChange={(e)=>setTotal(e.target.value)}/>
              <button onClick={() => deleteData(Data.transaction_id)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400">Delete</button>
            </div>
          ))}
        </div>
        
      </div>
    );
}

export default GetData

