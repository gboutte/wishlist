const router = require('express').Router();
const { checkSchema } = require("express-validator");
const ErrorCode = require('../utils/errorCode');
const validate =  require("../utils/validate");;


const {list,image} = require('../controller/wishPublicController');
router.get('/',list);
router.get('/:id/image',image);

module.exports = router;
