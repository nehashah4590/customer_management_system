import React, { useState } from 'react';
import axios from 'axios';
import GetCustomerID from '../customers/GetCustomer'

const AddCustomerLoyaltyTrans = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    points:'',
    type:'',
    tenant_id: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions`, formData);
      setSuccess('Data submitted successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      setError('Error submitting data');
      console.error('Error:', err);
    }
    setFormData({ 
        customer_id: '',
        points:'',
        type:'',
        tenant_id: ''})
  };

  return (
    <div className='flex'>
    <GetCustomerID/>
    <div className="w-[30vw] mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add Customers Loyalty Transactions</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customer_id" className="block text-gray-700">Customer ID</label>
          <input
            type="number"
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>  
        <div className="mb-4">
          <label htmlFor="points" className="block text-gray-700"> Points</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenant_id" className="block text-gray-700">Tenant ID</label>
          <input
            type="number"
            id="tenant_id"
            name="tenant_id"
            value={formData.tenant_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-900 text-white rounded-md shadow-sm hover:bg-green-400"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
    </div>
  );
};

export default AddCustomerLoyaltyTrans;
