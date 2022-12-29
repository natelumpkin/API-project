'use strict';

const { User, Spot } = require('../models')

const UserSpotBookings = {
  "demouser1": [
    {"Smallest House": {
      startDate: "2022-04-30T07:00:00.000Z",
      endDate: "2022-05-30T07:00:00.000Z"
    }},
    {"An inviting house in the clouds": {
      startDate: "2023-05-31T07:00:00.000Z",
      endDate: "2023-06-30T07:00:00.000Z"
    }}
  ],
  "demouser2": [
    {"Beautiful House": {
      startDate: "2022-07-30T07:00:00.000Z",
      endDate: "2022-08-30T07:00:00.000Z"
    }},
    {"Biggest House": {
      startDate: "2022-09-30T07:00:00.000Z",
      endDate: "2022-10-30T07:00:00.000Z"
    }}
  ],
  "demouser3": [
    {"An inviting house in the clouds": {
      startDate: "2022-11-30T07:00:00.000Z",
      endDate: "2022-12-30T07:00:00.000Z"
    }}
  ]
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

   for (let username in UserSpotBookings) {
    const user = await User.findOne({ where: { username: username}})

    for (let i = 0; i < UserSpotBookings[username].length; i++) {
      let spotObj = UserSpotBookings[username][i]

      for (let spotname in spotObj) {

        let spot = await Spot.findOne({where: {name: spotname}});
        let spotId = spot.id;

        const {startDate, endDate} = spotObj[spotname];

        await user.createBooking({spotId: spotId, startDate: startDate, endDate:endDate});
      }
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
    await queryInterface.bulkDelete('Bookings',{
      startDate: [
        "2022-04-30",
        "2022-03-31",
        "2022-07-30",
        "2022-09-30",
        "2022-11-30"
      ]
    })
  }
};
