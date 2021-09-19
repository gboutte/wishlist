const bcrypt = require('bcryptjs');
const Response = require('../utils/Response');
const ErrorCode = require('../utils/errorCode');
const Authenticator = require('../lib/authenticator.js');
const db = require('../models');

async function register(req, res) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  db.User.create({
    username: req.body.username,
    password: hashedPassword
  }).then(() => {
    Response.successMessage(res, 'Done !');
  }).catch((error) => {
    console.error(error);
  });

}

async function login(req, res) {
  let users = await db.User.findAll({
    where: {
      username: req.body.username
    }
  });
  if (users.length > 0) {
    let user = users[0];
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) { return Response.badRequest(res, ErrorCode.get('userBadCredentials')); }

    Response.success(res, { token: Authenticator.getToken(user) });

  } else {
    Response.badRequest(res, [ErrorCode.get('userBadCreditentials')]);
  }


}

module.exports.register = register;
module.exports.login = login;
