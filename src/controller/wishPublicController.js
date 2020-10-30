
const Response = require('../utils/Response');
const ErrorCode = require('../utils/errorCode');
const db = require('../models');

async function list(req,res){

  let wishes = await db.Wish.findAll({
     where: {
        disabled:false
     }

  });

    Response.successData(res,wishes);
}
module.exports.list = list;
