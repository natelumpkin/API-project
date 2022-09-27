'use strict';

const { User, Spot } = require('../models')

const UserSpotReviews = {
  'demouser2': {
    'Smallest House': {
      review: "This is the smallest house I've ever seen",
      stars: 4
    },
    'Beautiful House': {
      review: "This is the most beautiful house I've ever seen",
      stars: 2
    }
  },
  'demouser1': {
    'Biggest House': {
      review: "This is the biggest house I've ever seen",
      stars: 3
    },
    'Amazing House': {
      review: "This is the most amazing house I've ever seen",
      stars: 5
    }
  },
  'demouser5': {
    'Average House': {
      review: "This is the most average house I've ever seen",
      stars: 1
    }
  }
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
   for (let username in UserSpotReviews) {
    const user = await User.findOne({where: { username: username}})
    for (let spotname in UserSpotReviews[username]) {
      const spot = await Spot.findOne({where: {name: spotname}})
      const spotId = spot.id;
      const {review, stars} = UserSpotReviews[username][spotname];
      await user.createReview({spotId: spotId, review: review, stars: stars})
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
    await queryInterface.bulkDelete('Reviews', {
      review: [
        "This is the smallest house I've ever seen",
        "This is the most beautiful house I've ever seen",
        "This is the biggest house I've ever seen",
        "This is the most amazing house I've ever seen",
        "This is the most average house I've ever seen"
      ]
    })
  }
};
