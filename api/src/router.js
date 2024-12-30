const express = require('express');
const usersController =  require('./controllers/usersController');

const router = express.Router();

router.get('/usuarios', usersController.getAll);

module.exports = router;