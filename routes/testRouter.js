const express = require('express');
const router = express.Router();
const { test, getPage} = require("../controllers/testController");

/* GET users listing. */
router.get('/' , test)

router.get('/page' , getPage)


module.exports = router;