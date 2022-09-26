const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn('AVG',sequelize.col('stars')),'avgRating'],
      ]
    },
    group: "Spot.id",
    include: [{
      model: SpotImage,
      as: 'previewImage',
      where: {
       preview: true,
      },
      attributes: ['url']
    },
    {
      model: Review,
      attributes: []
    }]
  });
  res.json({
    Spots: spots
  });
});

router.get('/current', requireAuth, async (req, res) => {
  const spots = Spot.findAll({
    where: {
      ownerId: req.user.id
    },
    // attributes: {
    //   include: [
    //     [sequelize.fn('AVG',sequelize.col('stars')),'avgRating'],
    //   ]
    // },
    // group: "Spot.id",
    // include: [{
    //   model: SpotImage,
    //   where: {
    //    preview: true,
    //   },
    //   attributes: ['url']
    // },
    // {
    //   model: Review,
    //   attributes: []
    // }]
  })
  res.json(spots)
})

router.get('/:spotId', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn('COUNT',sequelize.col('review')),'numReviews'],
        [sequelize.fn('AVG',sequelize.col('stars')),'avgRating']
      ]
    },
    group: "Spot.id",
    include: [{
      model: SpotImage,
      attributes: ['url']
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

module.exports = router;
