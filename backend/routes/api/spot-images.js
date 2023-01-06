const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

// Delete image
// Update image

router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId,
    {
      include: {
        model: Spot
      }
    });

  if (!image) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
      statusCode: 404
    })
  }

  if (image.Spot.ownerId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    })
  }

  const spotId = image.spotId
  const preview = image.preview

  await image.destroy();

  if (preview) {
    const newImage = await SpotImage.findOne({
      where: {
        spotId: spotId
      }
    })
    // console.log(newImage)
    await newImage.update({
      preview: true
    })
  }


  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

router.put('/:imageId', requireAuth, async (req, res) => {

  // this route does nothing but changes the preview-boolean
  // on the target image to true,
  // and changes the preview-boolean on all the other images
  // to false

  const image = await SpotImage.findByPk(req.params.imageId,
    {
      include: {
        model: Spot
      }
    });

  if (!image) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
      statusCode: 404
    })
  }

  if (image.Spot.ownerId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    })
  }

  const otherImages = await SpotImage.findAll({
    where: {
      spotId: image.spotId
    }
  })

  // console.log(image)
  await image.update({
    preview: true
  })
  for (let image of otherImages) {
    await image.update({
      preview: false
    })
  }
  // console.log(otherImages)
  return res.json({
    image
  })
})

module.exports = router;
