const express = require('express');
const router = express.Router();
const { test, getPage, ip} = require("../controllers/testController");

/* GET users listing. */
router.get('/' , test)

router.get('/page' , getPage)
router.get('/ip',ip)

module.exports = router;