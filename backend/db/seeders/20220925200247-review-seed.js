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
    },
    "Lucky House": {
      review: "This is the luckiest house I've ever seen",
      stars: 1
    },
    'An imposing house belies its comfortable interior': {
        review: "This is the most imposing house I've ever seen",
        stars: 3
      },
      'An inviting house in the clouds': {
        review: "This is the most inviting house I've ever seen",
        stars: 5
      },
      'Flower House: nights full of flowers!': {
        review: "This is the most enchanting house I've ever seen",
        stars: 4
      },
      'This cozy house is filled with books': {
        review: "This is the coziest house I've ever seen",
        stars: 3
      },
      'A well maintained, proper house': {
        review: "This is the most well maintained house I've ever seen",
        stars: 2
      },
      'A rooftop house resembles a perfect treehouse!': {
        review: "This is the coolest treehouse I've ever seen!",
        stars: 1
      }
    },
  'demouser1': {
    'Biggest House': {
      review: "I loved this big house!",
      stars: 3
    },
    'Amazing House': {
      review: "I loved this amazing house!",
      stars: 5
    },
    "Pool House": {
      review: "I loved the pool here!",
      stars: 4
    },
    'An inviting house in the clouds': {
      review: "I loved these wonderful clouds!",
      stars: 5
    },
    'Flower House: nights full of flowers!': {
      review: "These flowers were so enchanting!",
      stars: 4
    },
    'This cozy house is filled with books': {
      review: "This is the coziest house I've ever seen",
      stars: 3
    },
    'A well maintained, proper house': {
      review: "This is such a proper house!",
      stars: 2
    },
    'A rooftop house resembles a perfect treehouse!': {
      review: "I loved this rooftop treehouse!",
      stars: 1
    }
  },
  "demouser3": {
    'Smallest House': {
      review: "This house is really tiny!",
      stars: 4
    },
    'Beautiful House': {
      review: "I was shocked at how beautiful this house was!",
      stars: 2
    },
    "Lucky House": {
      review: "The luck didn't rub off on me at all",
      stars: 1
    },
    'Biggest House': {
      review: "This gigantic house made me feel so small",
      stars: 3
    },
    'Amazing House': {
      review: "No joke, this house is absolutely amazing!",
      stars: 5
    },
    "Pool House": {
      review: "I went swimming for hours and house",
      stars: 4
    },
    'Flower House: nights full of flowers!': {
      review: "The flowers were so beautiful and profuse, I felt enchanted by them!",
      stars: 4
    },
    'This cozy house is filled with books': {
      review: "I read every book I could get my hand on",
      stars: 3
    },
    'A well maintained, proper house': {
      review: "Not as well maintained as they say!",
      stars: 2
    },
    'A rooftop house resembles a perfect treehouse!': {
      review: "I couldn't climb up here",
      stars: 1
    }
  },
  "demouser4": {
    'Smallest House': {
      review: "Just as small as they said it would be!",
      stars: 4
    },
    'Beautiful House': {
      review: "Really not that beautiful to be house",
      stars: 2
    },
    "Lucky House": {
      review: "I was so lucky to have been here",
      stars: 3
    },
    'Biggest House': {
      review: "This place was like a cathedral, so big was it!",
      stars: 3
    },
    'Amazing House': {
      review: "I was so amazed to have been here!",
      stars: 4
    },
    "Pool House": {
      review: "The deepest pool I've ever seen",
      stars: 2
    },
    'A well maintained, proper house': {
      review: "Nothing out of place, true to its word!",
      stars: 5
    },
    'A rooftop house resembles a perfect treehouse!': {
      review: "I could see the whole city from up here",
      stars: 5
    }
  },
  'demouser5': {
    'An inviting house in the clouds': {
      review: "I was chilly in the clouds",
      stars: 1
    },
    'Smallest House': {
      review: "Such a small house! I had a cozy time in here",
      stars: 3
    },
    'Beautiful House': {
      review: "Really just so beautiful, no words",
      stars: 5
    },
    "Lucky House": {
      review: "I spent eight nights here, and never had a bad night!",
      stars: 4
    },
    'An imposing house belies its comfortable interior': {
        review: "Completely cozy on the inside, imposing on the outside, just like the pictures!",
        stars: 3
      },
      'An inviting house in the clouds': {
        review: "So high up in the clouds, I felt surrounded by the entire sky!",
        stars: 5
      },
      'Flower House: nights full of flowers!': {
        review: "The scent of these wonderful flowers spread throughout the entire house",
        stars: 4
      },
      'This cozy house is filled with books': {
        review: "I don't even like to read, but just the feeling of the books gave me such comfort",
        stars: 3
      },
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
