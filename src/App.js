import { useState } from "react";
import CustomersLayout from "./components/customers/Layout";
import OrderLayout from "./components/orders/Layout";
import LoyaltyProgramLayout from "./components/loyaltyPrograms/Layout";
import ExpensesLayout from "./components/expenses/Layout";
import LoyaltyTransLayout from "./components/customersLoyaltyrans/Layout";
import { GoPeople } from "react-icons/go";
import { MdProductionQuantityLimits, MdLoyalty } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";

function App() {
  const [addCustomer, setAddCustomer] = useState(false);
  const [addCustomerOrder, setAddCustomerOrder] = useState(false);
  const [addLoyaltyProgram, setAddLoyaltyProgram] = useState(false);
  const [addExpenses, setAddExpenses] = useState(false);
  const [addCustomerLoyaltyTrans, setAddCustomerLoyaltyTrans] = useState(false);

  const handleToggle = (setter) => {
    setAddCustomer(false);
    setAddCustomerOrder(false);
    setAddLoyaltyProgram(false);
    setAddExpenses(false);
    setAddCustomerLoyaltyTrans(false);
    setter(true);
  };

  return (
    <div className="flex">
      <div className="bg-blue-900 w-[20vw] h-screen py-8 ">
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${addCustomer ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setAddCustomer)}
        >
          <GoPeople className="mr-4 text-2xl" /> Customers
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${addCustomerOrder ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setAddCustomerOrder)}
        >
          <MdProductionQuantityLimits className="mr-4 text-2xl" />Orders
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${addCustomerLoyaltyTrans ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setAddCustomerLoyaltyTrans)}
        >
          <FaMedal className="mr-4 text-2xl" />Loyalty Transactions
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${addLoyaltyProgram ? 'bg-green-400' : 'bg-transparent'}`}

          onClick={() => handleToggle(setAddLoyaltyProgram)}
        >
          <MdLoyalty className="mr-4 text-2xl" />Loyalty Programs
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${addExpenses ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setAddExpenses)}
        >
          <GiExpense className="mr-4 text-2xl" />Expenses
        </button>
      </div>
      <div className="w-full bg-gray-200">
        {addCustomer && <CustomersLayout />}
        {addCustomerOrder && <OrderLayout />}
        {addLoyaltyProgram && <LoyaltyProgramLayout />}
        {addExpenses && <ExpensesLayout />}
        {addCustomerLoyaltyTrans && <LoyaltyTransLayout />}
      </div>
    </div>
  );
}

export default App;
