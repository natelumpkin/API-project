'use strict';

const bcrypt = require('bcryptjs');

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
   await queryInterface.bulkInsert('Users',[{
    email: 'magorgus@aol.com',
    username: 'bigMagorgus',
    firstName: 'big',
    lastName: 'magorgus',
    hashedPassword: bcrypt.hashSync('password')
   },{
    email: 'magongus@aol.com',
    username: 'bigMagongus',
    firstName: 'big',
    lastName: 'magongus',
    hashedPassword: bcrypt.hashSync('password2')
   },{
    email: 'malongus@aol.com',
    username: 'bigMalongus',
    firstName: 'big',
    lastName: 'malongus',
    hashedPassword: bcrypt.hashSync('password3')
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users',{
      username: {
        [Op.in]: ['bigMagorgus','bigMagongus','bigMalongus']
      }
    })
  }
};
