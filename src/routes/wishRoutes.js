const router = require('express').Router();
const { checkSchema } = require("express-validator");
const ErrorCode = require('../utils/errorCode');
const validate =  require("../utils/validate");;

const {create,list,update,remove,listOne} = require('../controller/wishController');

router.post('/',validate(
    //@todo  add validation
    checkSchema({

    })
  )
  ,create);
router.put('/',validate(
    //@todo  add validation
    checkSchema({

    })
  )
  ,update);
router.delete('/:id',validate(
    //@todo  add validation
    checkSchema({

    })
  )
  ,remove);

router.get('/:id',listOne);
router.get('/',list);

module.exports = router;
