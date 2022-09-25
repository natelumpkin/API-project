'use strict';

const Op = require('Sequelize');
const { User } = require('../models')

const SpotUsers =
  {
    'demouser1': [
      {
        address: '100 Small Ave',
        city: 'Smalltown',
        state: 'CA',
        country: 'USA',
        lat: 31.1194890,
        lng: -90.1295419,
        name: 'Smallest House',
        description: 'The smallest house in the whole world',
        price: 12.99
      },
      {
        address: '400 Beautiful St',
        city: 'Beautifultown',
        state: 'MD',
        country: 'France',
        lat: 76.1194890,
        lng: 78.1294319,
        name: 'Beautiful House',
        description: 'The most beautiful house in the whole world',
        price: 49.99
      }
    ],
    'demouser2': [
      {
        address: '200 Big St',
        city: 'Bigville',
        state: 'NY',
        country: 'United States of America',
        lat: -61.1194890,
        lng: 90.1295419,
        name: 'Biggest House',
        description: 'The biggest house in the whole world',
        price: 1120.99
      },
      {
        address: '500 Amazing Pl',
        city: 'Amazingville',
        state: 'WY',
        country: 'USA',
        lat: 56.1194890,
        lng: 32.1295419,
        name: 'Amazing House',
        description: 'The most amazing house in the whole world',
        price: 12.99
      }
    ],
    'demouser3': [{
      address: '300 Average St',
      city: 'Mediumville',
      state: 'CT',
      country: 'United States',
      lat: 10.1194890,
      lng: -110.1295419,
      name: 'Average House',
      description: 'The most average house in the whole world',
      price: 99.99
    }]
  }

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
    for (let username in SpotUsers) {
      let user = await User.findOne({ where: { username: username }});
      for (let spotObj of SpotUsers[username]) {
        const {address, city, state, country, lat, lng, name, description, price } = spotObj;
        let spot = await user.createSpot({address: address, city: city, state: state, country: country, lat:lat, lng:lng, name:name, description:description, price:price })
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Spots', {
        name: ['Biggest House', 'Smallest House','Average House','Amazing House','Beautiful House']
    }, {});
  }
};
