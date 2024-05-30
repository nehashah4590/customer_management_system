const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.addExpenses);
router.put('/', expenseController.updateExpense);
router.delete('/', expenseController.deleteExpense);

module.exports = router;