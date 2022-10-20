'use strict';

const { Spot } = require('../models');
const spot = require('../models/spot');

const spotImages = {
  "Biggest House": [
    {
      preview: true,
      url: "https://64.media.tumblr.com/9730a538b8816c614b59c679424d9661/82bcfdf3f12283ea-eb/s1280x1920/291329cfd56c2d36eed0c2d25b87613377b3c2ef.jpg"
    },
    {
      preview: false,
      url: "some url"
    }
  ],
  "Smallest House": [
    {
      preview: true,
      url: "https://64.media.tumblr.com/f0fbfee0147b486df6d2687358cbe483/a7a1fb2b21ad7404-db/s1280x1920/e0261a334bb329b5e47e7c1194d83fe71c3e3a5b.jpg"
    }
  ],
  "Beautiful House": [
    {
      preview: true,
      url: "https://64.media.tumblr.com/5cb53a63c9147f628c8046b3e7aa86e0/2f708bffdb6ba444-0c/s1280x1920/6c09acb4bf0067d90d1e906d28ea32c771d0829f.jpg"
    }
  ],
  "Amazing House": [
    {
      preview: true,
      url: "https://64.media.tumblr.com/67111920b000dd160a239e772a9dcdbf/dbbec85ffccf652e-d7/s1280x1920/28531d199395159c4d8a98d530d0e2a71392dc81.jpg"
    }
  ],
  'An inviting house in the clouds': [
    {
      preview: true,
      url: "https://64.media.tumblr.com/8627cacd9f94c5d79294f4075f31b64a/5d4b8caae1bf6c04-18/s1280x1920/a7fe15d65d40029e6f1bfa5bfd21c083e8fe6852.jpg"
    }
  ],
  'Flower House: nights full of flowers!': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/21eabf7a3ff3cb9e98f5acf1e0cae8ab/95f4cff538f909a1-a7/s1280x1920/4baecf94dd6e5ce2c5c886ca05efc38b64fefa56.jpg'
    }
  ],
  'An imposing house belies its comfortable interior': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/3246b9a0202172250d2e71413abf8180/8be5a862f566a89f-3e/s1280x1920/d1d501f72409bcf63d5ed99fbb5f5877504315fc.jpg'
    }
  ],
  'This cozy house is filled with books': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/4b486da86f0dbfa647a2b405854ea6c8/9014fe13bc027a87-05/s1280x1920/78c4be144b50a665feb5c59be7031e787e509a6f.jpg'
    }
  ],
  'A well maintained, proper house': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/cceaa2669b5d1261912ccd1319d4a288/7a3057dd3c89efc8-4f/s1280x1920/56632cb7e7ab01958ab4b6a062ddcf7723143065.jpg'
    }
  ],
  'A rooftop house resembles a perfect treehouse!': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/dfa951f282a620dd97a38fd25b7291c8/ea20320b70bb7938-84/s1280x1920/d73042963c91e7bfb41919fb18a60fbd34c74480.jpg'
    }
  ],
  'Lucky House': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/21db1d5eb6f39b51cd445f92677a86aa/ec2968e846c6cf45-ac/s1280x1920/01d6b6784e4a31ea6434072768260576442a23b4.jpg'
    }
  ],
  'Pool House': [
    {
      preview: true,
      url: 'https://64.media.tumblr.com/b544012fa120bdfb02fb3edeffec5a7e/435cacf7506b01d4-72/s1280x1920/499d30fa01022ddb7331b78aec187d2c8a6063cd.jpg'
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
      url: [
        'some url',
        "https://64.media.tumblr.com/9730a538b8816c614b59c679424d9661/82bcfdf3f12283ea-eb/s1280x1920/291329cfd56c2d36eed0c2d25b87613377b3c2ef.jpg",
        "https://64.media.tumblr.com/f0fbfee0147b486df6d2687358cbe483/a7a1fb2b21ad7404-db/s1280x1920/e0261a334bb329b5e47e7c1194d83fe71c3e3a5b.jpg",
        "https://64.media.tumblr.com/5cb53a63c9147f628c8046b3e7aa86e0/2f708bffdb6ba444-0c/s1280x1920/6c09acb4bf0067d90d1e906d28ea32c771d0829f.jpg",
        "https://64.media.tumblr.com/67111920b000dd160a239e772a9dcdbf/dbbec85ffccf652e-d7/s1280x1920/28531d199395159c4d8a98d530d0e2a71392dc81.jpg",
        "https://64.media.tumblr.com/8627cacd9f94c5d79294f4075f31b64a/5d4b8caae1bf6c04-18/s1280x1920/a7fe15d65d40029e6f1bfa5bfd21c083e8fe6852.jpg",
        'https://64.media.tumblr.com/21eabf7a3ff3cb9e98f5acf1e0cae8ab/95f4cff538f909a1-a7/s1280x1920/4baecf94dd6e5ce2c5c886ca05efc38b64fefa56.jpg',
        'https://64.media.tumblr.com/3246b9a0202172250d2e71413abf8180/8be5a862f566a89f-3e/s1280x1920/d1d501f72409bcf63d5ed99fbb5f5877504315fc.jpg',
        'https://64.media.tumblr.com/4b486da86f0dbfa647a2b405854ea6c8/9014fe13bc027a87-05/s1280x1920/78c4be144b50a665feb5c59be7031e787e509a6f.jpg',
        'https://64.media.tumblr.com/cceaa2669b5d1261912ccd1319d4a288/7a3057dd3c89efc8-4f/s1280x1920/56632cb7e7ab01958ab4b6a062ddcf7723143065.jpg',
        'https://64.media.tumblr.com/dfa951f282a620dd97a38fd25b7291c8/ea20320b70bb7938-84/s1280x1920/d73042963c91e7bfb41919fb18a60fbd34c74480.jpg',
        'https://64.media.tumblr.com/21db1d5eb6f39b51cd445f92677a86aa/ec2968e846c6cf45-ac/s1280x1920/01d6b6784e4a31ea6434072768260576442a23b4.jpg',
        'https://64.media.tumblr.com/b544012fa120bdfb02fb3edeffec5a7e/435cacf7506b01d4-72/s1280x1920/499d30fa01022ddb7331b78aec187d2c8a6063cd.jpg'
      ]
    })
  }
};
