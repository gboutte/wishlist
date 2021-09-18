const uuid = require('uuid/v4');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define('Wish', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
    },
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    disabled: DataTypes.BOOLEAN
  }, {});
  Wish.associate = function (models) {
    Wish.hasMany(models.Picture);
  };
  return Wish;
};
