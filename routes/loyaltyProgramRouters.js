const express = require('express');
const router = express.Router();
const loyaltyProgramController = require('../controllers/loyaltyProgramController');

router.get('/', loyaltyProgramController.getLoyaltyPrograms);
router.post('/', loyaltyProgramController.addLoyaltyProgram);
router.put('/', loyaltyProgramController.updateLoyaltyProgram);
router.delete('/', loyaltyProgramController.deleteLoyaltyProgram);

module.exports = router;
