const router = require('express').Router();
const { checkSchema } = require('express-validator');
const ErrorCode = require('../utils/errorCode');
const validate = require('../utils/validate');

const { register } = require('../controller/userController');

router.post('/user', validate(
  checkSchema({
    password: {
      in: ['body'],
      isLength: {
        errorMessage: ErrorCode.userPasswordLength,
        options: { min: 8 }
      },
      matches: {
        errorMessage: ErrorCode.userPasswordNumber,
        options: [/[0-9]/, 'g']
      }
    },
    username: {
      errorMessage: ErrorCode.userUsername,
      in: ['body'],
      isLength: {
        options: { min: 4 }
      },
    }
  })
)
, register);


module.exports = router;
