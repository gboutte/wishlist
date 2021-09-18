const uuid = require('uuid/v4');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
    },
    username: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING
  }, {});
  User.associate = function () {

  };
  return User;
};
