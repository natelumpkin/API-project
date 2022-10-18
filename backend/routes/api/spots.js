const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');
const review = require('../../db/models/review');

const router = express.Router();

// Table of Contents

// Get all spots /
// Get spots of current user /current
// Post image to spot /:spotId/images
// Post review to spot /:spotId/reviews
// Post booking to spot /:spotId/bookings
// Get reviews by spot /:spotId/reviews
// Get bookings by spot /:spotId/bookings
// Get spot by id /:spotId
// Post new spot /
// Put spot /:spotId
// Delete spot /:spotId

router.get('/', async (req, res, next) => {

  // Begin search query

  // Get all search params through deconstructing

  let {
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice
  } = req.query;

  const where = {};

  const errorResult = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }

// Set default page and size, or send errors if incorrect values

  if (!page) {
    page = 1;
  } else if (page > 10) {
    page = 10
  } else if (isNaN(page) || page <= 0) {
    errorResult.errors.page = 'Page must be greater than or equal to 1'
  } else {
    page = parseInt(page);
  };

  if (!size) {
    size = 20
  } else if (size > 20) {
    size = 20
  } else if (isNaN(size) || size <= 0) {
    errorResult.errors.size = 'Size must be greater than or equal to 1'
  } else {
    size = parseInt(size);
  };

  // For pagination,
  // Create limit and offset values based on page and size

  const limit = size;
  const offset = size * (page - 1);

  // Search query error handling

 if (minLat < -90 || minLat > 90) {
  errorResult.errors.minLat = 'Minimum latitude is invalid'
 }
 if (maxLat < -90 || maxLat > 90) {
  errorResult.errors.maxLat = 'Maximum latitude is invalid'
 }
 if (minLng < -180 || minLng > 180) {
  errorResult.errors.minLng = 'Minimum longitude is invalid'
 }
 if (maxLng < -180 || maxLng > 180) {
  errorResult.errors.maxLng = 'Maximum longitude is invalid'
 }
 if (minPrice < 0) {
  errorResult.errors.minPrice = 'Minimum price must be greater than or equal to 0'
 }
 if (maxPrice < 0) {
  errorResult.errors.maxPrice = 'Maximum price must be greater than or equal to 0'
 }

 // Add query additions to where object

  if (minLat && !maxLat) {
    where.lat = {[Op.gte]: minLat};
  }
  else if (maxLat && !minLat) {
    where.lat = {[Op.lte]: maxLat};
  } else if (minLat && maxLat) {
    where.lat = {
      [Op.gte]: minLat,
      [Op.lte]: maxLat
    }
  }
  if (minLng && !maxLng) {
    where.lng = {[Op.gte]: minLng};
  }
  else if (maxLng && !minLng) {
    where.lng = {[Op.lte]: maxLng};
  } else if (maxLng && minLng) {
    where.lng = {
      [Op.gte]: minLng,
      [Op.lte]: maxLng
    }
  }
  if (minPrice && !maxPrice) {
    where.price = {[Op.gte]: minPrice};
  }
  else if (maxPrice && !minPrice) {
    where.price = {[Op.lte]: maxPrice};
  } else if (minPrice && maxPrice) {
    where.price = {
      [Op.gte]: minPrice,
      [Op.lte]: maxPrice
    }
  }

  // Send error result if there are any errors
  if (Object.keys(errorResult.errors).length) {
    res.status(400);
    return res.json(errorResult);
  }

  const newSpots = await Spot.findAll({
    where,
    include: [{
      model: SpotImage,
    }],
    limit: limit,
    offset: offset,
    order: ['id']
  });

  // Turn spotslist to iterable object
  let spotList = [];
  newSpots.forEach(spot => {
    // Turn each spot into iterable object
    spotList.push(spot.toJSON());
  })

  // Get aggregate data in a single query

  // const reviews = await Review.findAll({
  //   attributes: {
  //     include: [
  //       [
  //         sequelize.fn('AVG',sequelize.col('stars')),'avgRating'
  //       ]
  //     ]
  //   },
  //   group: ['spotId', "id"]
  // })

  const reviews = await Review.findAll({
    order: [ 'spotId' ]
  })

  const reviewList = [];
  reviews.forEach(review => {
    reviewList.push(review.toJSON());
  })

  console.log("review list: ", reviewList)


  // Turn SpotImages key to previewImage key
  // and add aggregate data onto each spot

  spotList.forEach(spot => {
    let reviewFound;
    let numReviews = 0;
    let sumStars = 0;
    reviewList.forEach(review => {
      if (spot.id === review.spotId) {
        numReviews++;
        sumStars += review.stars;
        reviewFound = true;
      }
    })

    let avgRating = sumStars / numReviews;
    spot.avgRating = avgRating;

    if (!reviewFound) {
      spot.avgRating = null;
    }


    spot.SpotImages.forEach(spotImage => {

      if (spotImage.preview) {
        spot.previewImage = spotImage.url
       } //else {
      //   spot.previewImage = 'No preview image available'
      // }

    })
    delete spot.SpotImages;
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
  })

  // add page and size to result
  return res.json({
    Spots: spotList,
    page: page,
    size: size
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

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id === spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  const { startDate, endDate } = req.body;

  const newBooking = await spot.createBooking({
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate
  })

  return res.json(newBooking);
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

  return res.json({
    Reviews: reviews
    });
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id === spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        attributes: ['id','firstName','lastName']
      }
    });
    return res.json(bookings);
  } else {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes:  ['spotId','startDate','endDate']
    });
    return res.json({Bookings: bookings});
  }
})

router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn('COUNT',sequelize.col('review')),'numReviews'],
        [sequelize.fn('AVG',sequelize.col('stars')),'avgStarRating']
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

  const spotObj = spot.toJSON();

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }
  })

  const reviewList = [];
  reviews.forEach(review => {
    reviewList.push(review.toJSON());
  })

  if (reviewList.length > 0) {

  let numReviews = 0;
  let sumStars = 0;
  reviewList.forEach(review => {
    if (spot.id === review.spotId) {
      numReviews++;
      sumStars += review.stars;
      reviewFound = true;
    }
  })

  let avgRating = sumStars / numReviews;

  spotObj.avgStarRating = avgRating;
  spotObj.numReviews = numReviews;
} else {
  spotObj.avgStarRating = null;
  spotObj.numReviews = 0;
}

  res.json(spotObj);

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
