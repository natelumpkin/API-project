import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Thunks and Utils
import { getSpotById } from "../../store/spot";
import { getReviewsBySpot } from "../../store/review";
import formatAvgRating from "../../utils/formatAvgRating";

// Context

import { Modal } from "../../context/Modal";

// Components
import ReviewsPreview from "./ReviewsPreview";
import SpotImagesCard from "./SpotImagesCard";
import SpotReviews from "../SpotReviewsModal/SpotReviews";
import CreateReviewForm from "../CreateReviewForm";


const SpotDetails = () => {
  //console.log('SPOT DETAILS IS TRYING TO RENDER')

  const { spotId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  //console.log('SPOT DETAILS IS TRYING TO RENDER. IS LOADED VARIABLE: ', isLoaded)
  // console.log('Spot Id from use params!: ', spotId)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotById(spotId))
      .then(() => dispatch(getReviewsBySpot(spotId)))
      .then(() => setisLoaded(true))
  }, [dispatch, isLoaded])

  const singleSpot = useSelector(state => state.spots.singleSpot);
  const userInfo = useSelector(state => state.session.user);
  const spotReviews = useSelector(state => state.reviews.spot);

  let currentUserHasReviewed;

  let spotReviewsArr = Object.values(spotReviews);
  //console.log('SPOT REVIEWS ARR: ', spotReviewsArr)
  //if (userInfo) console.log('userInfo.id slice of state: ', userInfo.id)
  //console.log('SPOT DETAILS SINGLESPOT SLICE OF STATE: ', singleSpot)
  if (userInfo) {
    for (let review of spotReviewsArr) {
      if (userInfo.id === review.userId) currentUserHasReviewed = true;
    }
  }
  //console.log('CURRENTUSERHASREVIEWED: ', currentUserHasReviewed)

  // FORMATTING STATE FOR RENDERING

  const spotImages = singleSpot.SpotImages;
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

  let formattedAvgRating
  if (singleSpot.avgStarRating) formattedAvgRating = formatAvgRating(singleSpot.avgStarRating)


  // RETURN STATEMENT

  if (!isLoaded) {
    return (
      <p>...Loading spot details</p>
    )
  } else {
    //console.log('ATTEMPTING TO LOAD MAIN BODY', 'IS LOADING VARIABLE: ', isLoaded)
  return (
    <div>
      <div className="details-main-holder">
        <div className="title-card">
          <h2>{singleSpot.name}</h2>
          {userInfo && userInfo.id === singleSpot.ownerId && (
            <div>
              <Link to={`/spots/${singleSpot.id}/edit`}>
                Edit
              </Link>
            </div>
          )}
          <div>
            <h4>
              {formattedAvgRating} <i className="fa-solid fa-star"></i>
              <span> • </span>
              <span>
                <Link onClick={() => setShowModal(true)}>{singleSpot.numReviews} {(singleSpot.numReviews > 1 || singleSpot.numReviews < 1) && `reviews`}{singleSpot.numReviews === 1 && 'review'}</Link>
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
          <ReviewsPreview setShowModal={setShowModal} spotId={spotId} avgRating={singleSpot.avgStarRating} numReviews={singleSpot.numReviews}/>
          <button onClick={() => setShowModal(true)}>Show all {singleSpot.numReviews} reviews</button>
          {userInfo && userInfo.id !== singleSpot.ownerId && !currentUserHasReviewed &&
            <button onClick={() => setShowReviewForm(true)}>Review this Spot</button>
          }
        </div>
        <div className="location-card">
          <h2>Where you'll be</h2>
          {/* <LocationAPI/> */}
          <div>
            <h4>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h4>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotReviews setShowModal={setShowModal} spotId={spotId} avgRating={formattedAvgRating} numReviews={singleSpot.numReviews}/>
        </Modal>
      )}
      {showReviewForm && (
        <Modal onClose={() => setShowReviewForm(false)}>
          <CreateReviewForm spotId={spotId} spotInfo={singleSpot} setShowReviewForm={setShowReviewForm}/>
        </Modal>
      )}
    </div>
  )
      }
}

export default SpotDetails;
