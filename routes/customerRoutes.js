const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getCustomer);
router.post('/', customerController.addCustomer);
router.put('/', customerController.updateCustomerDetails);

module.exports = router;
