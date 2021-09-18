
const db = require('../models');
const Reponse = require('../utils/Response');

function needInstall(req, res, next) {
  db.User.findAll({}).then((users) => {
    if (users.length <= 0) {

      Reponse.forbidden(res, ['NEED_INSTALL']);
    } else {
      return next();
    }

  });
}
function isInstall(req, res, next) {
  db.User.findAll({}).then((users) => {
    if (users.length > 0) {

      Reponse.forbidden(res, ['ALREADY_INSTALLED']);
    } else {
      return next();
    }

  });
}

module.exports.needInstall = needInstall;
module.exports.isInstall = isInstall;
