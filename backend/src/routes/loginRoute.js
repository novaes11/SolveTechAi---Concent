const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Create
router.post('/', loginController.createLogin);

// Read
// router.get('/', loginController.getAllLogins);
// router.get('/:id', loginController.getLoginById);

// Update
// router.put('/:id', loginController.updateLogin);

// Delete
// router.delete('/:id', loginController.deleteLogin);

module.exports = router;
