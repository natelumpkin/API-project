const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models')

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt','updatedAt']
        },
        include: {
          model: SpotImage,
          attributes: ['url','preview']
        }
      },
      {
        model: ReviewImage,
        attributes: ['id','url']
      }
    ]
  });

  let reviewList = [];
  reviews.forEach(review => {
    reviewList.push(review.toJSON());
  });

  reviewList.forEach(review => {
    review.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview) {
        review.Spot.previewImage = spotImage.url
      } else {
        review.Spot.previewImage = 'No preview image available'
      }
    })
    delete review.Spot.SpotImages;
  })

  res.json(reviewList);
})

// router.get('/current', requireAuth, async (req, res) => {
//   // const reviews = Review.findAll({
//   //   where: {
//   //     id: req.user.id
//   //   },
//   //   include: [
//   //     {
//   //       model: User,
//   //       attributes: ['id', 'firstName', 'lastName']
//   //     },
//   //     {
//   //       model: Spot,
//   //       include: {
//   //         model: SpotImage,
//   //         attributes: ['url','preview']
//   //       }
//   //     },
//   //     {
//   //       model: ReviewImage,
//   //       attributes: ['id','url']
//   //     }
//   //   ]
//   // })

//   // res.json(reviews);

// });





module.exports = router;
