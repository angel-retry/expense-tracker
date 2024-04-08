'use strict'

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', 10)
    await queryInterface.bulkInsert('Users',
      Array.from({ length: 5 }).map((_, i) => (
        {
          name: `user${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date()
        }
      ))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
