'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn(
        'Wishes',
        'picture',
        {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Wishes',
        'order',
        {
          allowNull: true,
          type: Sequelize.INTEGER
        }
      ),
    ]);
  },

  down: (queryInterface) => {


    return Promise.all([
      queryInterface.removeColumn(
        'Wishes',
        'picture'
      ),
      queryInterface.removeColumn(
        'Wishes',
        'order'
      )
    ]);
  }
};
