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
    firstName: 'Charles',
    lastName: 'Atley',
    hashedPassword: bcrypt.hashSync('password')
   },{
    email: 'demouser2@email.com',
    username: 'demouser2',
    firstName: 'Rebecca',
    lastName: 'Fallow',
    hashedPassword: bcrypt.hashSync('password2')
   },{
    email: 'demouser3@email.com',
    username: 'demouser3',
    firstName: 'Cynthia',
    lastName: 'Hargold',
    hashedPassword: bcrypt.hashSync('password3')
   },{
    email: 'demouser4@email.com',
    username: 'demouser4',
    firstName: 'Ben',
    lastName: 'Fellsworth',
    hashedPassword: bcrypt.hashSync('password3')
   },{
    email: 'demouser5@email.com',
    username: 'demouser5',
    firstName: 'Scott and Adam',
    lastName: 'Pellinger',
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
