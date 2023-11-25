const express = require('express');
const {getPage, test} = require("../controllers/test");
const {helloWorld} = require("../controllers/person");
const router = express.Router();

/* GET home page. */
router.get('/', helloWorld);
router.get('/page' , getPage )
module.exports = router;
