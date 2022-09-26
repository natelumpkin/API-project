'use strict';

const { Review } = require('../models')

const reviewImages = {
  "This is the smallest house I've ever seen": [
    {
      url: "some url"
    },
    {
      url: "some url"
    }
  ],
  "This is the most beautiful house I've ever seen": [
    {
      url: "some url"
    }
  ],
  "This is the biggest house I've ever seen": [
    {
      url: "some url"
    }
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
     for (let reviewText in reviewImages) {
      const review = await Review.findOne({ where: { review: reviewText }});
      for (let reviewImage of reviewImages[reviewText]) {
        const { url } = reviewImage;
        await review.createReviewImage({ url: url})
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
     await queryInterface.bulkDelete('ReviewImages',{
      url: "some url"
    })
  }
};
