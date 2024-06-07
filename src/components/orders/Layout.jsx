// src/components/Layout.js
import React, { useState } from 'react';
import AddCustomerOrder from './AddCustomerOrder';
import GetOrderData from './GetOrderData';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddCustomerOrder />;
      case 'update':
        return <GetOrderData />;
      default:
        return null;
    }
  };

  return (
    <div className='flex w-full  justify-between max-h-screen overflow-hidden'>
      
      <div className='mx-8'>
        {renderComponent()}
      </div>

      <div className='flex flex-col w-[200px] space-y-4 m-10'>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('add')}>Add New Orders</button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('update')}>Get Order List</button>
      </div>

    </div>
  );
};

export default Layout;
