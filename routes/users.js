const express = require('express');
const router = express.Router();
const {getPeople, getPerson, getPage} = require('../controllers/person.js')

/* GET users listing. */
router.get('/people/:limit' , getPeople)

router.get('/person/:id' , getPerson)

module.exports = router;
