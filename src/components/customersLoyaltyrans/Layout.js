// src/components/Layout.js
import React, { useState } from 'react';
import AddCustomerLoyaltyTrans from './AddCustomerLoyaltyTrans';
import GetData from './GetData';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddCustomerLoyaltyTrans />;
      case 'update':
        return <GetData />;
      default:
        return null;
    }
  };

  return (
    <div className=' w-auto justify-between h-screen'>
      <div className='m-10 flex flex-col space-y-2 w-[250px]'>
      <button className="bg-blue-900 text-white p-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('add')}>Add Customer Loyalty Trans</button>
      <button className="bg-blue-900 text-white p-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('update')}>Get Data</button>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Layout;