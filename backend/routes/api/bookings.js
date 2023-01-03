const express = require('express');
const { Spot, User, Review, Booking, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Validator } = require('sequelize');

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
    let previewImageExists;
    booking.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
        booking.Spot.previewImage = spotImage.url;
        previewImageExists = true;
      }
    })
    if (!previewImageExists) {
      booking.Spot.previewImage = "No preview image uploaded."
    }
    delete booking.Spot.SpotImages;
  })

  res.json({Bookings: bookingList});
});

router.put('/:bookingId', requireAuth, async (req, res) => {

  // Find the booking by ID
  const booking = await Booking.findByPk(req.params.bookingId);

  // Error message if there is no booking
  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  };

  // Error message if current user is not the owner of the booking
  if (req.user.id !== booking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    });
  }

  // Extract variables from request body
  const { startDate, endDate } = req.body;

  // Find today's date
  const now = new Date().toString();

  // Import Validator object to check if current date is after end date of booking
  if (Validator.isAfter(now,booking.endDate.toString())) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  // Update
  await booking.update({
    startDate: startDate,
    endDate: endDate
  })

  return res.json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res) => {

  if (isNaN(req.params.bookingId)) {
    res.status(400);
    return res.json({
      message: `${req.params.bookingId} is not a valid bookingId. Please provide an integer`,
      statusCode: 400
    })
  }

  const booking = await Booking.findByPk(req.params.bookingId, {
    include: {
      model: Spot
    }
  });

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  // spot must belong to the current user, or booking must belong to current user

  if ((req.user.id !== booking.Spot.ownerId) && (req.user.id !== booking.userId)) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    })
  }

  const now = new Date().toString();
  // console.log(now);
  // console.log(Validator.isAfter(now,booking.endDate));
  // console.log(booking.endDate);

  if (Validator.isAfter(now,booking.startDate.toString())) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  await booking.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
})

module.exports = router;
