import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCustomersDetails = () => {
    const [customersData, setCustomersData] = useState([]);
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    useEffect(() => {
      // Fetch customer data from the backend
      axios.get(`${process.env.REACT_APP_API_HOST}/customers`)
        .then(response => {
            setCustomersData(response.data.customerData);
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    }, []);
  

    const updatePhoneNumber = (customerId) => {
      // Make API request to update phone number
      console.log(customerId)
      axios.put(`${process.env.REACT_APP_API_HOST}/customers`, { 
        customer_id:customerId,
        phone:newPhoneNumber })
        .then(response => {
          // Update local state with updated customer data
          console.log(response);
          
        })
        .catch(error => {
          console.error('Error updating phone number:', error);
        });
    };
  
    return (
      <div className='mb-4 m-10'>
        <h1 className="text-2xl font-bold ">Customer Details</h1>
        <div className="">
            <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
                <p className='w-[50px] bg-gray-200 rounded-md px-4 py-2'>ID</p>
                <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Name</p>
                <p className='w-[300px] bg-gray-200 rounded-md px-4 py-2'>Email</p>
                <p className='w-[100px] bg-gray-200 rounded-md px-4 py-2'>Phone</p>
            </div>
          {customersData.map(customer => (
            <div key={customer.customer_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
              <div className='w-[50px] overflow-x-auto'>{customer.customer_id}</div>
              <div className='w-[100px] overflow-x-auto'>{customer.first_name}</div>
              <div className='w-[100px] overflow-x-auto'>{customer.last_name}</div>
              <div className='w-[300px] overflow-x-auto'>{customer.email}</div>
              <input className='w-[100px]'  type="text" defaultValue={customer.phone} onChange={(e)=>setNewPhoneNumber(e.target.value)}></input>
              <button onClick={() => updatePhoneNumber(customer.customer_id)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-green-400">Update</button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UpdateCustomersDetails
