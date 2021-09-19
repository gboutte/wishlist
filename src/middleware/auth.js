const Response = require('../utils/Response');
const authenticator = require('../lib/authenticator');
async function auth(req, res, next) {
  const token = req.header('Authorization');
  if (token && process.env.TOKEN_SECRET) {
    if (token.indexOf('Bearer ') !== -1) {
      let user = await authenticator.validateToken(token.replace('Bearer ', ''));
      if (user) {
        req.user = user;
        return next();
      } else {
        Response.unauthorized(res);
      }

    } else {
      Response.unauthorized(res);
    }
  } else {
    Response.unauthorized(res);
  }
}

module.exports = auth;
