const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/', orderController.getOrder);
router.post('/', orderController.addOrder);
router.put('/', orderController.updateOrder);
router.delete('/', orderController.deleteOrder);

module.exports = router;
