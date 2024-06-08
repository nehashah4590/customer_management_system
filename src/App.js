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
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerOrder, setShowCustomerOrder] = useState(false);
  const [showLoyaltyProgram, setShowLoyaltyProgram] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showCustomerLoyaltyTrans, setShowCustomerLoyaltyTrans] = useState(false);

  const handleToggle = (setter) => {
    setShowCustomer(false);
    setShowCustomerOrder(false);
    setShowLoyaltyProgram(false);
    setShowExpenses(false);
    setShowCustomerLoyaltyTrans(false);
    setter(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-blue-900 w-[17vw] h-screen py-8 ">
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex  ${showCustomer ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setShowCustomer)}
        >
          <GoPeople className="mr-4 text-2xl" /> Customers
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${showCustomerOrder ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setShowCustomerOrder)}
        >
          <MdProductionQuantityLimits className="mr-4 text-2xl" />Orders
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${showCustomerLoyaltyTrans ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setShowCustomerLoyaltyTrans)}
        >
          <FaMedal className="mr-4 text-2xl" />Loyalty Transactions
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${showLoyaltyProgram ? 'bg-green-400' : 'bg-transparent'}`}

          onClick={() => handleToggle(setShowLoyaltyProgram)}
        >
          <MdLoyalty className="mr-4 text-2xl" />Loyalty Programs
        </button>
        <button
          className={`px-8 font-semibold py-4 mt-8 w-full hover:bg-green-400 text-white flex ${showExpenses ? 'bg-green-400' : 'bg-transparent'}`}
          onClick={() => handleToggle(setShowExpenses)}
        >
          <GiExpense className="mr-4 text-2xl" />Expenses
        </button>
      </div>
      {/* Main Content */}
      <div className="w-[83vw] bg-gray-200">
        {showCustomer && <CustomersLayout />}
        {showCustomerOrder && <OrderLayout />}
        {showLoyaltyProgram && <LoyaltyProgramLayout />}
        {showExpenses && <ExpensesLayout />}
        {showCustomerLoyaltyTrans && <LoyaltyTransLayout />}
      </div>
    </div>
  );
}

export default App;