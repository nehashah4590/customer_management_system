import { useState } from 'react';
import axios from 'axios';

const GetOrderData = () => {
    const [orderData, setOrderData] = useState([]);
    const [item, setItem] = useState('');
    const [customer_id, setCustomerID] = useState('');
    const [total, setTotal] = useState('');

    const handleSubmit =async(e) => {
        e.preventDefault();
      // Fetch customer data from the backend
      await axios.get(`${process.env.REACT_APP_API_HOST}/orders?customer_id=${customer_id}`)
        .then(response => {
            setOrderData(response.data.orderData);
            console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    }
  

    const updateDetails = (orderId) => {
      // Make API request to update phone number

      axios.put(`${process.env.REACT_APP_API_HOST}/orders`, { 
        items:item , 
        total_amount:total, 
        order_id: orderId})
        .then(response => {
          // Update local state with updated customer data
          console.log(response);
          
        })
        .catch(error => {
          console.error('Error updating phone number:', error);
        });
    };

    const deleteOrders = async(orderId) => {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/orders?order_id=${orderId}`);
            console.log('Order deleted successfully:', response.data);
            const updatedData = orderData.filter(order => order.order_id !== orderId);
             setOrderData(updatedData);
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
            type="number"
            id="customer_id"
            placeholder="Enter customer id"
            value={customer_id}
            onChange={(e)=>setCustomerID(e.target.value)}
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
        <h1 className="text-2xl font-bold ">Customer Order Details Details</h1>
        <div className="">
            <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>OrderID</p>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>CustomerID</p>
                <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Date</p>
                <p className='w-[150px] bg-gray-200 rounded-md px-4 py-2'>Items</p>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>Total</p>
            </div>
          {orderData?.map(OrderData => (
            <div key={OrderData.order_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
              <div className='w-[100px] overflow-x-auto'>{OrderData.order_id} </div>
              <div className='w-[100px] overflow-x-auto'>{OrderData.customer_id} </div>
              <div className='w-[200px] overflow-x-auto'>{OrderData.date} </div>
              <input className='w-[150px] overflow-x-auto text-center' defaultValue={OrderData.items} type='text' onChange={(e)=>setItem(e.target.value)}/>
              <input className='w-[100px] overflow-x-auto text-center' defaultValue={OrderData.total_amount} type='text' onChange={(e)=>setTotal(e.target.value)}/>
              <button onClick={() => updateDetails(OrderData.order_id)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-green-400">Update</button>
              <button onClick={() => deleteOrders(OrderData.order_id)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400">Delete</button>
            </div>
          ))}
        </div>
        
      </div>
    );
}

export default GetOrderData
