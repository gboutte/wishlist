'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pictures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      file: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: () => new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: () => new Date(),
      },
      wishId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Wishes',
            schema: 'public'
          },
          key: 'id'
        },

      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Pictures');
  }
};
