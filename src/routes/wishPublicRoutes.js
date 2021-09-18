const router = require('express').Router();


const {list,image} = require('../controller/wishPublicController');
router.get('/',list);
router.get('/:id/image',image);

module.exports = router;
