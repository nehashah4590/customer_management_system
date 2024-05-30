const express = require('express');
const router = express.Router();
const loyaltyTransactionController = require('../controllers/loyaltyTransController');

router.get('/', loyaltyTransactionController.getCustomerLoyaltyTransactionsData);
router.post('/', loyaltyTransactionController.addCustomerLoyaltyTransactions);
router.delete('/', loyaltyTransactionController.deleteCustomerLoyaltyTransactions);

module.exports = router;
