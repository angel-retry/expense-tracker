'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Records',
      Array.from({ length: 20 }).map((_, i) => ({
        name: `Record -  ${i}`,
        category: CATEGORY[Math.floor(Math.random() * Object.keys(CATEGORY).length)],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null)
  }
};
