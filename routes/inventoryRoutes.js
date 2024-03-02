const express = require('express');
const authMiddelware = require('../middlewares/authMiddelware');
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController');
const router = express.Router();


//routes
// ADD INVENTPRY || POST
router.post('/create-inventory', authMiddelware, createInventoryController)


// ADD INVENTPRY || GET
router.get('/get-inventory',authMiddelware,getInventoryController)
module.exports =router