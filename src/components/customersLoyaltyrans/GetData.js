import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSearch } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';

const GetData = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions`)
      .then(response => {
        setTransactionData(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  useEffect(() => {
    const result = transactionData.filter(data => {
      return Object.values(data).some(value =>
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
        return 0;
      }
    };
    const sorted = [...transactionData].sort(compare);
    setFilteredData(sorted);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  };

  const deleteData = async (transactionId) => {

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/loyaltyTransactions?transaction_id=${transactionId}`);
      console.log('Order deleted successfully:', response.data);
      const updatedData = transactionData.filter(data => data.transaction_id !== transactionId);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('There was an error deleting the order!', error);
      // Handle the error accordingly
    }

  };

  return (
    <div className='mb-4 m-10'>
      <div className='flex justify-center relative my-4'>
        <input
          type="text"
          placeholder="Search customers loyalty transaction point"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='px-4 py-2 rounded-md shadow-md w-full'
        /><MdSearch className=' absolute right-[10px] mt-[5px] text-3xl' />
      </div>
      <h1 className="text-2xl font-bold ">Customer Loyalty Points Details</h1>
      <table className="min-w-full bg-white border overflow-scroll">
        <thead>
          <tr className=''>
            <th onClick={() => sorting("customer_id")} className=" py-2 px-4 border-b"><div className='flex'>CustomerID<FaSort className=' m-1' /></div></th>
            <th onClick={() => sorting("first_name")} className=" py-2 px-4 border-b"><div className='flex'>Name<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("email")} className=" py-2 px-4 border-b"><div className='flex'>Email<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("address")} className=" py-2 px-4 border-b"><div className='flex'>Address<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("phone")} className=" py-2 px-4 border-b"><div className='flex'>Phone<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("transaction_id")} className=" py-2 px-4 border-b"><div className='flex'>TransactionID<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("type")} className=" py-2 px-4 border-b"><div className='flex'>Type<FaSort className='m-1' /></div></th>
            <th onClick={() => sorting("points")} className=" py-2 px-4 border-b"><div className='flex'>Points<FaSort className='m-1' /></div></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.transaction_id} className=''>
              <td className="py-2 px-4 border-b">{item.customer_id}</td>
              <td className="py-2 px-4 border-b">{item.first_name + " " + item.last_name}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">{item.address}</td>
              <td className="py-2 px-4 border-b">{item.phone}</td>
              <td className="py-2 px-4 border-b">{item.transaction_id}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.points}</td>
              <button onClick={() => deleteData(item.transaction_id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ">Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetData