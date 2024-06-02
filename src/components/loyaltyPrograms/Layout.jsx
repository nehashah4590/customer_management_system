// src/components/Layout.js
import React, { useState } from 'react';
import AddLoyaltyProgram from './AddLoyaltyProgram';
import GetData from './GetData';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddLoyaltyProgram />;
      case 'get':
        return <GetData/>;
      default:
        return null;
    }
  };

  return (
    <div className='flex w-full justify-between'>
      
      <div className=''>
        {renderComponent()}
      </div>

      <div className='flex flex-col w-[200px] space-y-4 my-20 mr-10'>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('add')}>Add Loyalty Program</button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => setActiveComponent('get')}>Get Loyalty Programs</button>
      </div>

    </div>
  );
};

export default Layout;
