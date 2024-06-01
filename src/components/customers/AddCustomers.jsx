import React, { useState } from 'react';
import axios from 'axios';

const AddCustomers = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    loyalty_points: '',
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
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/customers`, formData);
      console.log('Data sent successfully:', response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        loyalty_points: '',
      });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md h-auto ">
      <h2 className="text-xl font-bold mb-8">Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label htmlFor="first_name" className="block mb-1">First Name</label>
            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="last_name" className="block mb-1">Last Name</label>
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="loyalty_points" className="block mb-1">Loyalty Points</label>
          <input type="number" id="loyalty_points" name="loyalty_points" value={formData.loyalty_points} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400">Submit</button>
      </form>
    </div>
  );
};

export default AddCustomers;
