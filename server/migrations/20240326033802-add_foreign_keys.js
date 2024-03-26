'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.addColumn('Comments', 'commentBody', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', 
        key: 'id',      
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'postId');

  
    await queryInterface.removeColumn('Comments', 'commentBody');
  }
};
