const express = require('express');
const router = express.Router();
const { test} = require("../controllers/test");

/* GET users listing. */
router.get('/' , test)


module.exports = router;