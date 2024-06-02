
import { useState } from 'react';
import axios from 'axios';

export default function GetCustomerID() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pointsPerDollar, setPointsPerDollar] = useState('');
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/loyaltyPrograms`, { 
        name:name,
        description:description,
        points_per_dollar:pointsPerDollar
       });
      console.log(response.data);
      setError('');
    } catch (err) {
      setError('Failed to get customer ID. Please try again.');
      
    }
    setName('');
    setDescription('');
    setPointsPerDollar('');
  };

  return (
    <div className="max-w-lg w-[400px] h-auto py-2 mt-10 mx-8 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold p-4">Add New Loyalty Programs</h2>
      <form onSubmit={handleSubmit} className="w-full p-4 space-y-4 ">
        <div>
          <label htmlFor="name" className="block mb-1">
            Program Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) =>setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="pointsPerDollar" className="block mb-1">
            Points Per Dollar
          </label>
          <input
            type="number"
            name="pointsPerDollar"
            id="pointsPerDollar"
            value={pointsPerDollar}
            onChange={(e) => setPointsPerDollar(e.target.value)}
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
      {error && <p className="px-4 py-2 text-red-600">{error}</p>}
    </div>
  );
}
