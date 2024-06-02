import React, { useState } from 'react';
import axios from 'axios';

const Addexpenses = () => {
  const [formData, setFormData] = useState({
    description:'' ,
    amount:'' ,
    expense_type:'',
    tenant_id:20
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/expenses`, formData);
      console.log('Data sent successfully:', response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        description:'' ,
        amount:'' ,
        expense_type:'',
        tenant_id:20
      });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="w-[400px] h-auto py-2 mt-10 mx-8 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold p-4">Add Expenses</h2>
      <form onSubmit={handleSubmit} className="w-full p-4 space-y-4 ">
        <div>
          <label htmlFor="name" className="block mb-1">
          expense type
          </label>
          <input
            type="text"
            name="expense_type"
            id="expense_type"
            value={formData.expense_type}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-green-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addexpenses;
