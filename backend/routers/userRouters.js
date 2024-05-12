const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
