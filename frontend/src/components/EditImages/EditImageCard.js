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
    <div className="current-img-preview">
      <div className="single-img-holder">
        <img className='preview-img edit-preview-img' src={image.url}></img>
      </div>
      <div className="img-card-button-holder">
      {!image.preview && (
      <button
        type="button"
        onClick={() => makePreview(image.id)}
        >
          Make this photo your cover
      </button>
      )}
      {image.preview && (
        <h4>This is your cover image</h4>
      )}
      {spotImages.length > 1 && (
      <button
        type="button"
        onClick={() => deleteImage(image.id)}
        >
          Permanently Remove Photo
        </button>
      )}
      </div>
    </div>
  )
}

export default EditImageCard;
