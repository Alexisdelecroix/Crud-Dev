const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// register a new user
router.post('/register', userController.createUser);

// Get All Users
router.get('/all', userController.getAllUsers);

// Get One Users
router.get('/one/:id', userController.getOneUsers)

// update a user
router.put('/:id', userController.updateUser)

// delete a user
router.delete('/users/:id', userController.deleteUser)


module.exports = router;