const express = require('express');
const { Spot, User, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt','updatedAt','description']
        },
        include: {
          model: SpotImage
        }
      }
    ]
  });

  let bookingList = [];
  bookings.forEach(booking => {
    bookingList.push(booking.toJSON());
  })

  bookingList.forEach(booking => {
    console.log(booking.Spot.SpotImages);
    booking.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview) {
        booking.Spot.previewImage = spotImage.url
      } else {
        booking.Spot.previewImage = 'No preview image available'
      }
    })
    delete booking.Spot.SpotImages;
  })

  res.json(bookingList);
});

module.exports = router;
