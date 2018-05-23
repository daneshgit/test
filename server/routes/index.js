var express = require('express');
const users=require('./users');
var router = express.Router();

/* GET home page. */
router.use('/users',users );

module.exports = router;
