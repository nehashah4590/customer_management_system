import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCustomersDetails = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pointsperdollar, setPointsperdollar] = useState('');

  useEffect(() => {
    // Fetch customer data from the backend
    axios.get(`${process.env.REACT_APP_API_HOST}/loyaltyPrograms`)
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);


  const updateDetails = (programId) => {
    // Make API request to update phone number
    console.log(programId)
    axios.put(`${process.env.REACT_APP_API_HOST}/loyaltyPrograms`, {
      name: name,
      description: description,
      points_per_dollar: pointsperdollar,
      program_id: programId
    })
      .then(response => {
        // Update local state with updated customer data
        console.log(response);

      })
      .catch(error => {
        console.error('Error updating phone number:', error);
      });
  };
  const deleteLoyaltyPrograms = (programId) => {
    console.log("undifineinthebackend", programId)

    let data_to_delete = JSON.stringify({
      "program_id": programId
    });

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_HOST}/loyaltyPrograms`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'Cookie_1=value'
      },
      data: data_to_delete
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log('Before update:', data);
        const updatedData = data.filter(program => program.program_id !== programId);
        setData(updatedData);
        console.log('After update:', updatedData);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className='mb-4 m-10'>
      <h1 className="text-2xl font-bold ">Loyalty Program Details</h1>
      <div className="">
        <div className='flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md font-bold '>
          <p className='w-[50px] bg-gray-200 rounded-md px-4 py-2'>ID</p>
          <p className='w-[200px] bg-gray-200 rounded-md px-4 py-2'>Name</p>
          <p className='w-[300px] bg-gray-200 rounded-md px-4 py-2'>Description</p>
          <p className='w-[150px] bg-gray-200 rounded-md px-4 py-2'>Point_per_dollar</p>
        </div>
        {data?.map(loyaltyData => (
          <div key={loyaltyData.program_id} className="flex items-center border border-gray-300 p-2 space-x-2 bg-white rounded-md shadow-md">
            <p className='w-[50px] overflow-x-auto'>{loyaltyData.program_id} </p>
            <input className='w-[200px] overflow-x-auto cursor-pointer' defaultValue={loyaltyData.name} type='text' onChange={(e) => setName(e.target.value)} />
            <input className='w-[300px] overflow-x-auto cursor-pointer' defaultValue={loyaltyData.description} type='text' onChange={(e) => setDescription(e.target.value)} />
            <input className='w-[150px] overflow-x-auto text-center cursor-pointer' defaultValue={loyaltyData.points_per_dollar} type='number' onChange={(e) => setPointsperdollar(e.target.value)} />
            <button onClick={() => updateDetails(loyaltyData.program_id)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-green-400">Update</button>
            <button onClick={() => deleteLoyaltyPrograms(loyaltyData.program_id)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateCustomersDetails
