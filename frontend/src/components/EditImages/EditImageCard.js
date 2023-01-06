import { useDispatch, useSelector } from "react-redux";

import * as spotActions from '../../store/spot'

const EditImageCard = ({image}) => {

  const dispatch = useDispatch()
  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)
  const spotId = useSelector(state => state.spots.singleSpot.id)

  // console.log('image: ', image)

  const deleteImage = async (imageId) => {
    // const spotId = image.spotId
    await dispatch(spotActions.deleteSpotImageById(imageId))
    if (image.preview) await dispatch(spotActions.getSpotById(spotId))
  }

  const makePreview = async (imageId) => {
    await dispatch(spotActions.updateSpotImageById(imageId))
  }

  return (
    <div>
      <img className='preview-img' src={image.url}></img>
      {spotImages.length > 5 && (
      <button type="button" onClick={() => deleteImage(image.id)} >Delete Image</button>
      )}
      {!image.preview && (
      <button type="button" onClick={() => makePreview(image.id)}>Make Preview</button>
      )}
      {image.preview && (
        <h4>Cover image</h4>
      )}
    </div>
  )
}

export default EditImageCard;
