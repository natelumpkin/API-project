'use strict';

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
    await  queryInterface.bulkInsert('Spots',[
      {
        ownerId: 4,
        address: '100 California Ave',
        city: 'Smalltown',
        state: 'CA',
        country: 'USA',
        lat: 31.1194890,
        lng: -90.1295419,
        name: 'Smallest House',
        description: 'The smallest house in the whole world',
        price: 120.99
      },
      {
        ownerId: 5,
        address: '200 Michaels St',
        city: 'Bigville',
        state: 'NY',
        country: 'United States of Ameria',
        lat: -61.1194890,
        lng: 90.1295419,
        name: 'Biggest House',
        description: 'The biggest house in the whole world',
        price: 1120.99
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      name: {
        [Op.in]: ['Smallest House','Biggest House']
      }
    })
  }
};
