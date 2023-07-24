const router = require('express').Router();
const userController = require('../controllers/user.controller');

// register a new user
router.post('/register', userController.createUser);

// // update
// router.put('/:id', userController.getAllUsers)


module.exports = router;