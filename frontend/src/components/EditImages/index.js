import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateSpotImageById } from "../../store/spot";
import EditImageCard from "./EditImageCard";

import './EditImages.css'
import * as spotActions from '../../store/spot'

const EditImages = () => {

  // what's the plan here?

  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages)
  const coverPhoto = spotImages.find(image => image.preview === true)
  const spotId = useSelector(state => state.spots.singleSpot.id)
  const dispatch = useDispatch()

  const [showEditImages, setShowEditImages] = useState(false)
  const [images, setImages] = useState(null)
  const [fileArray, setFileArray] = useState([])
  const [photoErrors, setPhotoErrors] = useState([])
  const [imageLoading, setImageLoading] = useState(false)
  const [disableUpload, setDisableUpload] = useState(false)


  // display the images you already have
  // choose one to be the preview --> ??
  // delete images you don't want --> this happens directly
  // upload new images --> this happens directly

  // we need to listen to state
  // we need a file upload similar to to create spot
  // we need a route to update images

  useEffect(() => {
    handlePhotoErrors();
  }, [images, fileArray])

  const handlePhotoErrors = () => {
    let errors = [];
    if (!spotImages || spotImages.length < 1) {
      errors.push(' Please upload at least one images')
      setDisableUpload(true)
    }
    else if (spotImages?.length + images?.length > 10) {
      errors.push(` Your listing can have no more than ten photos, this brings your total to ${spotImages?.length + images?.length}`)
      setDisableUpload(true)
    }
    else {
      setDisableUpload(false)
    }
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
    setImageLoading(true)
    await dispatch(spotActions.uploadSpotImageByID(spotId, { images }))
    setImageLoading(false)
    setImages(null)
    setFileArray([])
  }


  return (
    <div className="edit-images-holder">
      <div className="flex half space-between">
        <h4 className="form-directions photo-title">Photos</h4>
        {!showEditImages && (
        <button className="edit-photos-button" type="button" onClick={() => setShowEditImages(true)}>Edit Images</button>
        )}
      </div>
      {showEditImages && (
        <div className="edit-photos-main">
          {spotImages && (
        <div className='bottom-border preview-img-holder current-photos'>
          <div className="current-photos-title">
            {/* <h4>Current Photos</h4> */}
            <div onClick={() => setShowEditImages(false)} className="close-photos circle">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="current-photos-holder">
            <div className="cover-photo-holder">
              <div className="cover-photo-directions">
                <h4 className='cover-main-directions form-directions photo-form'>Cover Photo</h4>
                <h5 className='cover-directions photo-directions'>Your cover photo is a guest’s first impression of your listing.</h5>
                <h5 className='cover-directions photo-directions'>Choose a different cover below.</h5>
              </div>
              <img id="cover-photo" className='preview-img edit-preview-img' src={coverPhoto?.url}></img>
            </div>
            <div className="cover-photo-directions">
              <h4 className='cover-main-directions form-directions photo-form'>All Photos</h4>
              <h5 className='cover-directions photo-directions'>Upload new photos below</h5>

            </div>
            <div className="current-photos-holder">
              {spotImages.map(image => (
                <EditImageCard image={image} key={image.id}/>
              ))}
            </div>

          </div>
        </div>
      )}
      <div className="preview-photos-bottom">
        <div className="upload-photos-top">
          <div className="upload-photos-directions cover-photo-directions">
            <h4 className='cover-main-directions form-directions photo-form'>Upload New Photos</h4>
            <h5 className='cover-directions photo-directions'>Upload up to ten photos</h5>
            {photoErrors.length > 0 && (
                <div className='errors'>
                  {photoErrors.map(error => <div key={error}><i className="fa-solid fa-circle-exclamation"></i>{error}</div>)}
                </div>
              )}
          </div>
          <div className="upload-photos-holder">
            {!imageLoading && (
            <label
                id='upload-file-label'
                htmlFor='upload-image-button'
                className='form-directions upload-photos-button thirty-four'>
                  {images?.length >= 1 ? 'Change files' : 'Choose photos to upload'}
            </label>
            )}
            {images && !imageLoading && (
              <>
              <button
                className="add-photos-button thirty-four"
                onClick={() => addImages()}
                type="button"
                disabled={disableUpload}
                >
                  Upload Files
              </button>
              <div className="cancel-holder">
                <button
                  className="edit-photos-button cancel-upload"
                  onClick={() => {
                  setImages(null)
                  setFileArray([])
                  }}
                  type="button"
                  >
                    Cancel
                </button>
              </div>
              </>
            )}
            <input
              type="file"
              multiple
              id="upload-image-button"
              accept="image/jpeg, image/png"
              onChange={updateFiles}>
            </input>
          </div>

        </div>
        {fileArray && !imageLoading && (
            <div className='flex preview-img-holder upload-preview-imgs-holder'>
              {fileArray.map(url => (
                <img className='preview-img' key={url} src={url}></img>
              ))}
            </div>
          )}
        {imageLoading && (
          <h4>Uploading files, please wait...</h4>
        )}
      </div>

      </div>
      )}
    </div>
  )
}

export default EditImages;
