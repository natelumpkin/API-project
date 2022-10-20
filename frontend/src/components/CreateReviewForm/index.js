import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createReviewBySpotId } from "../../store/review";
import { getSpotById } from "../../store/spot";

import './CreateReviewForm.css'

const CreateReviewForm = ({spotId, spotInfo, setShowReviewForm}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5)
  const [validationErrors, setValidationErrors] = useState([])

  const handleValidationErrors = () => {
    const errors = [];
    if (!review.length) errors.push('Please enter a review')

    if (stars <= 0 || stars > 5) errors.push('Stars: Please enter a number from 1 to 5')
    if (isNaN(stars)) errors.push('Stars: Please enter a number between 1 and 5')
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = handleValidationErrors();
    //console.log('VALIDATION ERRORS FOR CREATE REVIEW FORM: ', validationErrors);
    if (validationErrors.length) return setValidationErrors(validationErrors);

    const reviewData = {
      review: review,
      stars: stars
    }

    //console.log('DISPATCHING CREATE REVIEW')
    let res = await dispatch(createReviewBySpotId(spotId, reviewData))
     await dispatch(getSpotById(spotId))
     if (res.errors) {
        let errors = [];
        for (let error in res.errors) {
          errors.push(res.errors[error])
        }
        setValidationErrors(errors);
        return;
      }

    setReview('')
    setStars(5)
    setValidationErrors([])
    setShowReviewForm(false);
    history.push(`/spots/${spotId}`)
  }


  return (
    <div className="create-review-form-card">
      <div className="create-review-exit-holder">
        <div onClick={() => setShowReviewForm(false)} className="review-circle">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="create-review-form-holder">

      <form className="create-review-form" onSubmit={handleSubmit}>
      <h4 className="create-review-title">Review {spotInfo.Owner.firstName}'s {spotInfo.name}</h4>
      <div className="create-review-exterior">
        <div className="review-input">
        <label className="name-description-title" htmlFor="review">Review</label>
        <textarea className='create-text description' id="review" value={review} onChange={(e) => setReview(e.target.value)}/>
        </div>
        <label className="stars-name-description-title" htmlFor="stars">Stars (1 to 5)</label>
        <div className="stars-input">
        <input className="stars-location-input" id="stars" type="number" value={stars} onChange={(e) => setStars(e.target.value)}></input>
        </div>
      </div>
      <div className="create-review-button-holder">
        <button className="create-review-button">Submit Review</button>
        </div>
        {validationErrors.length > 0 && (

            <ul>
              {validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>

        )}
      </form>
      </div>
    </div>
  )
}

export default CreateReviewForm;
