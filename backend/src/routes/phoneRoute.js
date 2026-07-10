const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');

// Create
router.post('/', phoneController.createPhone);

// Read
// router.get('/', phoneController.getAllPhones);
// router.get('/:id', phoneController.getPhoneById);

// Update
// router.put('/:id', phoneController.updatePhone);

// Delete
// router.delete('/:id', phoneController.deletePhone);

module.exports = router;
