import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSearch } from "react-icons/md";
import { FaSort } from "react-icons/fa";

const UpdateCustomersDetails = () => {
  const [customersData, setCustomersData] = useState([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customer data from the backend
    axios.get(`${process.env.REACT_APP_API_HOST}/customers`)
      .then(response => {
        setCustomersData(response.data.customerData);
        setFilteredData(response.data.customerData);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  useEffect(() => {
    const result = customersData.filter(customer => {
      return Object.values(customer).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredData(result);
  }, [searchQuery]);

  const sorting = (col) => {
    const compare = (a, b) => {
      const valA = a[col];
      const valB = b[col];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === "ASC"
          ? valA.toLowerCase() > valB.toLowerCase() ? 1 : -1
          : valA.toLowerCase() < valB.toLowerCase() ? 1 : -1;
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return order === "ASC"
          ? valA - valB
          : valB - valA;
      } else {
        // Handle cases where types are mixed or not string/number
        return 0;
      }
    };
    const sorted = [...customersData].sort(compare);
    setFilteredData(sorted);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  };



  const updatePhoneNumber = (customerId) => {
    // Make API request to update phone number
    console.log(customerId)
    axios.put(`${process.env.REACT_APP_API_HOST}/customers`, {
      customer_id: customerId,
      phone: newPhoneNumber
    })
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
      <div className='flex justify-center relative'>
        <input
          type="text"
          placeholder="Search customers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='px-4 py-2 rounded-md shadow-md w-[400px] '
          /><MdSearch  className=' absolute right-[200px] mt-1 text-3xl'/>
      </div>
      <h1 className="text-2xl font-bold ">Customer Details</h1>
      <div className="">
        <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
          <p onClick={() => sorting("customer_id")} className='flex w-[50px] bg-gray-200 rounded-md px-2 py-2'>ID<FaSort className='m-1'/></p>
          <p onClick={() => sorting("first_name")} className='flex w-[200px] bg-gray-200 rounded-md px-4 py-2'> Name <FaSort className='m-1'/></p>
          <p onClick={() => sorting("email")} className='flex w-[300px] bg-gray-200 rounded-md px-4 py-2'> Email <FaSort className='m-1'/></p>
          <p onClick={() => sorting("phone")} className='flex w-[100px] bg-gray-200 rounded-md px-4 py-2'> Phone <FaSort className='m-1'/></p>
        </div>
        {filteredData.map(customer => (
          <div key={customer.customer_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
            <div className='w-[50px] overflow-x-auto'>{customer.customer_id}</div>
            <div className='w-[100px] overflow-x-auto'>{customer.first_name}</div>
            <div className='w-[100px] overflow-x-auto'>{customer.last_name}</div>
            <div className='w-[300px] overflow-x-auto'>{customer.email}</div>
            <input className='w-[100px]' type="text" defaultValue={customer.phone} onChange={(e) => setNewPhoneNumber(e.target.value)}></input>
            <button onClick={() => updatePhoneNumber(customer.customer_id)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-green-400">Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateCustomersDetails
