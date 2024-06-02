const expenseModel = require('../models/expenseModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

const getAllExpenses =  async (req, res) => {
    try {
        const expenses = await expenseModel.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses', error);
        res.status(500).send('Internal Server Error');
    }
};

const addExpenses = async (req, res) => {
    const expenseData = req.body;
  
    try {
      const result = await expenseModel.addExpenses(expenseData);
      if (result.success) {
        res.status(201).json({ message: 'Expenses added successfully' });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error adding expenses:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateExpense = async (req, res) => {
    const updatingData = req.body;
    try {
        await expenseModel.updateExpense(updatingData);
        res.send('Expense updated successfully');
    } catch (error) {
        console.error('Error updating expense', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteExpense = async (req, res) => {
    const expense_id = req.query.expense_id;
    try {
        await expenseModel.deleteExpense(expense_id);
        res.send('Expense deleted successfully');
    } catch (error) {
        console.error('Error deleting expense', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {addExpenses, getAllExpenses, updateExpense, deleteExpense };
