import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

// Thunks and Utils
import { getSpotById } from "../../store/spot";


const SpotDetails = () => {
  console.log('Spot details is trying to render!')

  const { spotId } = useParams();

  console.log('Spot Id from use params!: ', spotId)

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Use effect 1 is running in SpotDetails!')
    dispatch(getSpotById(spotId))
  }, [])

  const singleSpot = useSelector(state => state.spots.singleSpot);
  console.log('singleSpot slice of state!: ', singleSpot)

  const spotImages = singleSpot.SpotImages;
  console.log('spotImages: ', spotImages)
  const ownerInfo = singleSpot.Owner;
  let previewImg;
  let nonPreviewImgs;
  if (spotImages.length) {
    previewImg = spotImages.find(image => {
      return image.preview === true;
    })
    nonPreviewImgs = spotImages.filter(image => {
      return image.preview === false;
    })
  }



  return (
    <div>
      <div className="details-main-holder">
        <div className="title-card">
          <h2>{singleSpot.name}</h2>
          <div>
            <h4>
              {singleSpot.avgStarRating}
              <span>
                <Link>{singleSpot.numReviews}{singleSpot.numReviews > 1 && `reviews`}{singleSpot.numReviews === 1 && 'review'}</Link>
              </span>
              <span>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</span>
            </h4>
          </div>
        </div>
        <div className="picture-card">
          <div className="preview-image">
            {previewImg && <img src={previewImg.url} alt='preview image'/>}
          </div>
          <div className="other-images">
            {nonPreviewImgs && nonPreviewImgs.length && nonPreviewImgs.map(image => (
              <img key={image.id} src={image.url} alt='non preview image' />
            ))}
          </div>
        </div>
        <div className="user-info">
          <h2>Spot hosted by {ownerInfo.firstName}</h2>
        </div>
        <div className="description-card">
          <p>{singleSpot.description}</p>
        </div>
        <div className="spot-reviews-card">

        </div>
        <div className="location-card">
          <h2>Where you'll be</h2>
          {/* <LocationAPI/> */}
          <div>
            <h4>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h4>
          </div>
        </div>
      </div>
      {/* <BottomIndex /> */}
    </div>
  )
}

export default SpotDetails;
