import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

// Thunks and Utils
import { getSpotById } from "../../store/spot";
import { getReviewsBySpot } from "../../store/review";

// Components
import ReviewsPreview from "./ReviewsPreview";
import SpotImagesCard from "./SpotImagesCard";


const SpotDetails = () => {
  // console.log('Spot details is trying to render!')

  const { spotId } = useParams();

  // console.log('Spot Id from use params!: ', spotId)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotById(spotId))
    dispatch(getReviewsBySpot(spotId))
  }, [])

  const singleSpot = useSelector(state => state.spots.singleSpot);
  const userInfo = useSelector(state => state.session.user);
  console.log('userInfo slice of state: ', userInfo)
  console.log('singleSpot slice of state!: ', singleSpot)

  const spotImages = singleSpot.SpotImages;
  // console.log('spotImages: ', spotImages)
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
          {userInfo.id === singleSpot.ownerId && (
            <div>
              <Link to={`/spots/${singleSpot.id}/edit`}>
                Edit
              </Link>
            </div>
          )}
          <div>
            <h4>
              {singleSpot.avgStarRating} <i className="fa-solid fa-star"></i>
              <span> • </span>
              <span>
                <Link>{singleSpot.numReviews} {(singleSpot.numReviews > 1 || singleSpot.numReviews < 1) && `reviews`}{singleSpot.numReviews === 1 && 'review'}</Link>
              </span>
              <span>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</span>
            </h4>
          </div>
        </div>
        <div className="picture-card">
          <SpotImagesCard previewImg={previewImg} nonPreviewImgs={nonPreviewImgs}/>
        </div>
        <div className="user-info">
          <h2>Spot hosted by {ownerInfo.firstName}</h2>
        </div>
        <div className="description-card">
          <p>{singleSpot.description}</p>
        </div>
        <div className="spot-reviews-card">
          <ReviewsPreview spotId={spotId} avgRating={singleSpot.avgStarRating} numReviews={singleSpot.numReviews}/>
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
