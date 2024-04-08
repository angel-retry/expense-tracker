'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users', { type: queryInterface.sequelize.QueryTypes.SELECT })
    const categories = await queryInterface.sequelize.query('SELECT id FROM Categories', { type: queryInterface.sequelize.QueryTypes.SELECT })
    const startDate = new Date('2023-01-01')
    const endDate = new Date()
    await queryInterface.bulkInsert('Records',
      Array.from({ length: 200 }).map(() => (
        {

          name: faker.lorem.word({ max: 10, min: 2 }),
          date: faker.date.between({ from: startDate, to: endDate }),
          amount: faker.number.int({ min: 10, max: 10000 }),
          user_id: users[Math.floor(Math.random() * users.length)].id,
          category_id: categories[Math.floor(Math.random() * categories.length)].id,
          created_at: new Date(),
          updated_at: new Date()
        }
      ))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null)
  }
}
