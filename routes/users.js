const express = require('express');
const router = express.Router();
const {getPeople, getPerson, test} = require('../controllers/usersController.js')

/* GET users listing. */
router.get('/:limit' , getPeople)

router.get('/:id' , getPerson)


module.exports = router;
