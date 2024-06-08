import React, { useState } from 'react';
import axios from 'axios';

const AddCustomerLoyaltyTrans = () => {
  const [formData, setFormData] = useState({
    phone: '',
    points: '',
    type: '',
    tenant_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions`, formData);
      setLoading(false);
      setSuccess('Data submitted successfully!');
      console.log('Response:', response.data);
      setFormData({
        phone: '',
        points: '',
        type: '',
        tenant_id: ''
      })
    } catch (err) {
      setLoading(false);
      setError('Error submitting data');
      console.error('Error:', err);
    }
  };

  return (
    <div className='flex'>
      <div className="w-[30vw] m-10 mt-0 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Add Customers Loyalty Transactions</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Customer Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
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
        {loading && <div className="mt-4">LOADING...</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {success && <div className="mt-4 text-green-600">{success}</div>}
      </div>
    </div>
  );
};

export default AddCustomerLoyaltyTrans;
