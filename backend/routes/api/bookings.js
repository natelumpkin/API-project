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

router.put('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  };

  if (req.user.id !== booking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    });
  }

  const { startDate, endDate } = req.body;

  await booking.update({
    startDate: startDate,
    endDate: endDate
  })

  res.json(booking);
})

module.exports = router;
