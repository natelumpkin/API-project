import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const EditImages = () => {

  // what's the plan here?

  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)

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


  return (
    <div>
      <h1>Hello from Edit Images!</h1>
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
        {spotImages && (
          <div className='flex preview-img-holder'>
            {spotImages.map(image => (
              <img className='preview-img' key={image.url} src={image.url}></img>
            ))}
          </div>
        )}
    </div>
  )
}

export default EditImages;
