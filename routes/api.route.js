var express = require('express');
var router = express.Router();
const userController = require('../controllers/api/user.controller');

// METHOD : GET 
router.get('/users', userController.index);
// METHOD : GET 
router.get('/users/:id', userController.show);
// METHOD : POST 
router.post('/users/', userController.store);
// METHOD : PUT
router.put('/users/:id', userController.update);
// METHOD : DELETE
router.delete('/users/:id', userController.destroy);

module.exports = router;