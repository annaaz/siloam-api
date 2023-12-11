'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      { user_id: '8a048904-3915-4805-b03c-a674a34849d1', email: 'siloam@gmail.com',name:'siloam',password:'$2b$10$3BI435i0G1whaZCKQMiIM.j10zp8SWPacbUdyIUObqjytEwWiUkju',role:'admin', createdAt: new Date(), updatedAt: new Date()},
      { user_id: '8a048904-3915-4805-b03c-a674a34849d3', email: 'annaz@gmail.com',name:'annaz',password:'$2b$10$3BI435i0G1whaZCKQMiIM.j10zp8SWPacbUdyIUObqjytEwWiUkju',role:'admin', createdAt: new Date(), updatedAt: new Date()},

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
