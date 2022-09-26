'use strict';

const { Spot } = require('../models');
const spot = require('../models/spot');

const spotImages = {
  "Biggest House": [
    {
      preview: true,
      url: "some url"
    },
    {
      preview: false,
      url: "some url"
    }
  ],
  "Smallest House": [
    {
      preview: true,
      url: "some url"
    }
  ],
  "Beautiful House": [
    {
      preview: true,
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
   for (let spotName in spotImages) {
    const spot = await Spot.findOne({ where: { name: spotName }});
    for (let spotImage of spotImages[spotName]) {
      const { preview, url } = spotImage;
      await spot.createSpotImage({ preview: preview, url: url})
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
    await queryInterface.bulkDelete('SpotImages',{
      url: "some url"
    })
  }
};
