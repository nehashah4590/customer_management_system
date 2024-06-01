import { useState } from "react";
import AddCustomers from "./components/customers/AddCustomers";
import AddCustomerOrder from "./components/orders/AddCustomerOrder";
import AddLoyaltyProgram from "./components/loyaltyPrograms/AddLoyaltyProgram";
import Addexpenses from "./components/expenses/Addexpenses";
import AddCustomerLoyaltyTrans from "./components/customersLoyaltyrans/AddCustomerLoyaltyTrans";
import { GoPeople } from "react-icons/go";
import { MdProductionQuantityLimits , MdLoyalty } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";

function App() {
  const [addCustomer, setAddCustomer] = useState(false);
  const [addCustomerOrder, setAddCustomerOrder] = useState(false);
  const [addLoyaltyProgram, setAddLoyaltyProgram] = useState(false);
  const [addExpenses, setAddExpenses] = useState(false);
  const [addCustomerLoyaltyTrans, setAddCustomerLoyaltyTrans] = useState(false);

  const handleChange = () =>{
    setAddCustomer(!addCustomer);
  }

  return (
    <div className="flex">
      <div className="bg-blue-900 w-[20vw] h-screen py-8 ">
        <button 
        className="px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex"
        onClick={handleChange}
        >
         <GoPeople className="mr-4 text-2xl" /> Add New Customers
        </button>
        <button 
        className="px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex "
        onClick={()=>setAddCustomerOrder(!addCustomerOrder)}
        >
          <MdProductionQuantityLimits className="mr-4 text-2xl"/>Add Order
        </button>
        <button 
        className="px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex "
        onClick={()=>setAddCustomerLoyaltyTrans(!addCustomerLoyaltyTrans)}
        >
          <FaMedal className="mr-4 text-2xl"/>Add Loyalty Trans
        </button>
        <button 
        className="px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex "
        onClick={()=>setAddLoyaltyProgram(!addLoyaltyProgram)}
        >
          <MdLoyalty className="mr-1 text-2xl"/>Add Loyalty Programs
        </button>
        <button 
        className="px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex "
        onClick={()=>setAddExpenses(!addExpenses)}
        >
          <GiExpense className="mr-4 text-2xl"/>Add Expenses
        </button>
      </div>
      <div className="w-full bg-gray-200">
        {addCustomer && <AddCustomers/>}
        {addCustomerOrder && <AddCustomerOrder/>}
        {addLoyaltyProgram && <AddLoyaltyProgram/>}
        {addExpenses && <Addexpenses/>}
        {addCustomerLoyaltyTrans && <AddCustomerLoyaltyTrans/>}
      </div>
    </div>
  );
}

export default App;
