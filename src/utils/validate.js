const {validationResult } = require("express-validator");
const Response = require("./Response");


const validate = (validations) => {
    return async (req, res , next) => {
      await Promise.all(validations.map((validation) => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      Response.badRequest(res, errors.array());
    };
  };
  
  module.exports = validate;
  