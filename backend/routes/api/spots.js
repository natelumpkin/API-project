const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

// Table of Contents

// Get all spots /
// Get current spot /current
// Post image to spot /:spotId/images
// Post review to spot /:spotId/reviews
// Get reviews by spot /:spotId/reviews
// Get spot by id /:spotId
// Post new spot /
// Put spot /:spotId
// Delete spot /:spotId

router.get('/', async (req, res) => {

  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn('AVG',sequelize.col('stars')),'avgRating'],
      ]
    },
    group: ['Spot.id','SpotImages.id'],
    include: [{
      model: SpotImage,
    },
    {
      model: Review,
      attributes: []
    }]
  });

  // spots.toJSON()
  let spotList = [];
  spots.forEach(spot => {
    spotList.push(spot.toJSON());
  })

  spotList.forEach(spot => {
    // iterate over spot.SpotImages
    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview) {
        spot.previewImage = spotImage.url
      } else {
        spot.previewImage = 'No preview image available'
      }
    })
    delete spot.SpotImages;
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }

    // if spotimage.preview = true,
    // set previewImage = spotimage.url
    // if spotimate.preview = false,
    // set previewImage = 'No preview image available'
  })




  return res.json({
    Spots: spotList
  });
});

router.get('/current', requireAuth, async (req, res) => {
  let currentId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      ownerId: currentId
    },
    attributes: {
      include: [
        [sequelize.fn('AVG',sequelize.col('stars')),'avgRating'],
      ]
    },
    group: ["Spot.id","SpotImages.id"],
    include: [{
      model: SpotImage,
    },
    {
      model: Review,
      attributes: []
    }]
  })

  let spotList = [];
  spots.forEach(spot => {
    spotList.push(spot.toJSON());
  })

  spotList.forEach(spot => {
    // iterate over spot.SpotImages
    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview) {
        spot.previewImage = spotImage.url
      } else {
        spot.previewImage = 'No preview image available'
      }
    })
    delete spot.SpotImages;
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
  })

  res.json({
    Spots: spotList
  })
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  const { url, preview } = req.body;

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  const newimage = await spot.createSpotImage({
    url: url,
    preview: preview
  })

  return res.json({
    id: newimage.id,
    url: newimage.url,
    preview: newimage.preview
  });
})

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const existentReviews = await Review.findAll({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId
    }
  });

  if (existentReviews.length) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  }

  let newReview = await spot.createReview({
    userId: req.user.id,
    review: review,
    stars: stars
  })

  res.status(201)
  return res.json(newReview)
})

router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      {
        model: User,
        attributes: ['id','firstName','lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id','url']
      }
    ]
  })

  return res.json(reviews);
})

router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn('COUNT',sequelize.col('review')),'numReviews'],
        [sequelize.fn('AVG',sequelize.col('stars')),'avgRating']
      ]
    },
    group: ["Spot.id","SpotImages.id","Reviews.id","Owner.id"],
    include: [{
      model: SpotImage,
      attributes: ['id','url','preview']
    },
    {
      model: Review,
      attributes: []
    },
    {
      model: User,
      as: 'Owner',
      attributes: ['id','firstName','lastName']
    }]
  });
  if (spot) {
  res.json(spot);
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})

router.post('/', requireAuth, async (req, res) => {

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  let spot = await Spot.create({
    ownerId: req.user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  })

  res.status(201)
  return res.json(spot);
})

router.put('/:spotId', requireAuth, async (req, res) => {

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  await spot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  })

  return res.json(spot);

})

router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})



module.exports = router;
