import { useSelector } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const SpotImageGallery = ({setShowModal, previewImg, nonPreviewImgs}) => {

  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)

  const images = []
  for (let image of spotImages) {
    images.push({
      original: image.url,
      thumbnail: image.url
    })
  }
  console.log(images)


  return (
      <ImageGallery items={images}/>
  )
}

export default SpotImageGallery;
