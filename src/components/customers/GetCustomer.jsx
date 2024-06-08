
import { useState } from 'react';
import axios from 'axios';

export default function GetCustomerID() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/customers/getCustomerIDByPhoneNumber` , { phone:phoneNumber });
      console.log(response.data);
      setCustomerId(response.data.customerData.customer_id);
      setError(null);
    } catch (err) {
      setError('Failed to get customer ID. Please try again.');
      setCustomerId('');
    }
    setPhoneNumber("")
  };

  return (
    <div className="w-[340px] h-[200px] py-2 mt-10 mx-8 bg-white shadow-md rounded">
      <form onSubmit={handleSubmit} className="w-full p-4 space-y-4 ">
        <div>
          <label htmlFor="phoneNumber" className="block text-xl font-bold mb-4">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-green-400"
          >
            Get Customer ID
          </button>
        </div>
      </form>
      {customerId && <p className=" px-4 text-green-600">Customer ID: {customerId}</p>}
      {error && <p className="px-4 text-red-600">{error}</p>}
    </div>
  );
}
