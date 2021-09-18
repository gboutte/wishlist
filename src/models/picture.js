const uuid = require('uuid/v4');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
    },
    file: DataTypes.STRING
  }, {});
  Picture.associate = function (models) {
    Picture.belongsTo(models.Wish);
    // associations can be defined here
  };
  return Picture;
};
