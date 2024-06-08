// src/components/Layout.js
import React, { useState } from 'react';
import AddCustomer from './AddCustomers';
import UpdateCustomersDetails from './UpdateCustomersDetails';
import GetCustomerID from './GetCustomer';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddCustomer />;
      case 'update':
        return <UpdateCustomersDetails />;
      case 'get':
        return <GetCustomerID />;
      default:
        return null;
    }
  };

  return (
    <div className='flex justify-between h-screen '>

      <div className='mx-8'>
        {renderComponent()}
      </div>

      <div className='flex flex-col w-[200px] space-y-4 m-10'>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('add')}>Add New Customer</button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('update')}>Get Customer Data</button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('get')}>Get Customer ID</button>
      </div>

    </div>
  );
};

export default Layout;