const loyaltyProgramModel = require('../models/loyaltyProgramModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

const getLoyaltyPrograms =  async (req, res) => {
    try {
        const loyaltyProgramms = await loyaltyProgramModel.getLoyaltyPrograms();
        res.json(loyaltyProgramms);
    } catch (error) {
        console.error('Error fetching Loyalty Programms', error);
        res.status(500).send('Internal Server Error');
    }
};

const addLoyaltyProgram = async (req, res) => {
    const loyalty_Programs_Data = req.body;
  
    try {
      const result = await loyaltyProgramModel.addLoyaltyProgram(loyalty_Programs_Data);
      if (result.success) {
        res.status(201).json({ message: 'Loyalty Program added successfully' });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error adding Loyalty Program:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const updateLoyaltyProgram = async (req, res) => {
    
    const loyalty_Programs_updateData= req.body;
    try {
        await loyaltyProgramModel.updateLoyaltyProgram(loyalty_Programs_updateData);
        res.send(' loyalty program data updated successfully');
    } catch (error) {
        console.error('Error  updateing loyalty program data', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteLoyaltyProgram = async (req, res) => {
  
    const {program_id} = req.body;
    
    try {
      const result = await loyaltyProgramModel.deleteLoyaltyProgram(program_id);
      if (result.success) {
        res.status(201).json({ message: 'Loyalty Program deleted successfully' });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
        console.error('Error deleting loyalty program', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {getLoyaltyPrograms, addLoyaltyProgram, updateLoyaltyProgram, deleteLoyaltyProgram };
