import { useSelector } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import './SpotImageGallery.css'

const SpotImageGallery = ({setShowModal, previewImg, nonPreviewImgs}) => {

  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)

  const images = []
  for (let image of spotImages) {
    images.push({
      original: image.url,
    })
  }
  // images.sort(img => img.preview)



  return (
      <ImageGallery
        items={images}
        showPlayButton={false}
        showBullets={true}
        slideDuration={0}

        />
  )
}

export default SpotImageGallery;
