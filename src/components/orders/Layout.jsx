// src/components/Layout.js
import React, { useState } from 'react';
import AddCustomerOrders from './AddCustomerOrder';
import GetOrderData from './GetOrderData';
import GetCustomerID from '../customers/GetCustomer'

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddCustomerOrders />;
      case 'get':
        return <GetOrderData />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex w-full justify-between'>

        <div className='flex'>
          <GetCustomerID />
        </div>

        <div className='flex flex-col w-[200px] space-y-4 my-20 mr-10'>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('add')}>Add Orders</button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('get')}>Get Orders Data</button>
        </div>
      </div>
      <div className='flex justify-center overflow-y-auto'>
      {renderComponent()}
      </div>
    </>
  );
};

export default Layout;
