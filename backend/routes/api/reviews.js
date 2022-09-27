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
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId, {
    include: {
      model: ReviewImage
    }
  });

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statuscode: 404
    });
  }

  if (review.userId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statuscode: 403
    })
  }

  const reviewObj = review.toJSON();
  if (reviewObj.ReviewImages.length >= 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
      statuscode: 403
    })
  }

  const { url } = req.body;

  const newImage = await review.createReviewImage({
    url: url
  })

  return res.json({
    id: newImage.id,
    url: newImage.url
  });
})

router.put('/:reviewId', requireAuth, async (req, res) => {
  const reviewToUpdate = await Review.findByPk(req.params.reviewId);
  if (!reviewToUpdate) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statuscode: 404
    });
  }

  if (reviewToUpdate.userId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statuscode: 403
    })
  }

  const {review, stars} = req.body;

  await reviewToUpdate.update({
    review: review,
    stars: stars
  });

  return res.json(reviewToUpdate);
})



module.exports = router;
