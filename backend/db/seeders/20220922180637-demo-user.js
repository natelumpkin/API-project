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
    email: 'demouser1@email.com',
    username: 'demouser1',
    firstName: 'User1',
    lastName: 'One',
    hashedPassword: bcrypt.hashSync('password')
   },{
    email: 'demouser2@email.com',
    username: 'demouser2',
    firstName: 'User2',
    lastName: 'Two',
    hashedPassword: bcrypt.hashSync('password2')
   },{
    email: 'demouser3@email.com',
    username: 'demouser3',
    firstName: 'User3',
    lastName: 'Three',
    hashedPassword: bcrypt.hashSync('password3')
   },{
    email: 'demouser4@email.com',
    username: 'demouser4',
    firstName: 'User4',
    lastName: 'Four',
    hashedPassword: bcrypt.hashSync('password3')
   },{
    email: 'demouser5@email.com',
    username: 'demouser5',
    firstName: 'User5',
    lastName: 'Five',
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

    await queryInterface.bulkDelete('Users',{
      username: ['demouser1','demouser2','demouser3','demouser4','demouser5']
    })
  }
};
