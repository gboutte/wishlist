const router = require('express').Router();
const { checkSchema } = require("express-validator");
const ErrorCode = require('../utils/errorCode');
const validate =  require("../utils/validate");;


const {list} = require('../controller/wishPublicController');
router.get('/',list);

module.exports = router;
