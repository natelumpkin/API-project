import { useDispatch } from "react-redux";

import * as spotActions from '../../store/spot'

const EditImageCard = ({image}) => {

  const dispatch = useDispatch()

  const deleteImage = async (imageId) => {
    await dispatch(spotActions.deleteSpotImageById(imageId))
  }

  const makePreview = async (imageId) => {
    await dispatch(spotActions.updateSpotImageById(imageId))
  }

  return (
    <div>
      <img className='preview-img' src={image.url}></img>
      <button type="button" onClick={() => deleteImage(image.id)} >Delete Image</button>
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
