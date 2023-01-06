import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateSpotImageById } from "../../store/spot";
import EditImageCard from "./EditImageCard";

import * as spotActions from '../../store/spot'

const EditImages = () => {

  // what's the plan here?

  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)
  const spotId = useSelector(state => state.spots.singleSpot.id)
  const dispatch = useDispatch()

  const [showEditImages, setShowEditImages] = useState(false)
  const [images, setImages] = useState(null)
  const [fileArray, setFileArray] = useState([])
  const [photoErrors, setPhotoErrors] = useState([])

  // display the images you already have
  // choose one to be the preview --> ??
  // delete images you don't want --> this happens directly
  // upload new images --> this happens directly

  // we need to listen to state
  // we need a file upload similar to to create spot
  // we need a route to update images

  useEffect(() => {
    handlePhotoErrors();
  }, [images])

  const handlePhotoErrors = () => {
    let errors = [];
    if (!images || images.length < 5) errors.push(' Please upload at least five images')
    if (images?.length > 10) errors.push(' Please upload no more than ten images')
    setPhotoErrors(errors);
    return errors;
  }

  const updateFiles = (e) => {
    const files = e.target.files;
    const imagesArray = []
    setImages(files)
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(URL.createObjectURL(files[i]))
    }
    setFileArray(imagesArray)
  };

  const addImages = async () => {
    await dispatch(spotActions.uploadSpotImageByID(spotId, { images }))
    setImages(null)
    setFileArray([])
  }


  return (
    <div>
      <h1>Hello from Edit Images!</h1>
        <button type="button" onClick={() => setShowEditImages(!showEditImages)}>Edit Images</button>
        {showEditImages && (
          <>
        <label
            id='upload-file-label'
            htmlFor='upload-image-button'
            className='form-directions'>
              {images?.length >= 1 ? 'Change files' : 'Choose photos to upload'}
        </label>
        <input
          type="file"
          multiple
          id="upload-image-button"
          accept="image/jpeg, image/png"
          onChange={updateFiles}>
        </input>
        <button onClick={() => addImages()} type="button">Add Images</button>
        {spotImages && (
          <div className='flex preview-img-holder'>
            {spotImages.map(image => (
              <EditImageCard image={image} key={image.id}/>
            ))}
          </div>
        )}
        </>
        )}
    </div>
  )
}

export default EditImages;
