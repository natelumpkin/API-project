import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createReviewBySpotId } from "../../store/review";
import { getSpotById } from "../../store/spot";


const CreateReviewForm = ({spotId, spotInfo, userInfo}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5)
  const [validationErrors, setValidationErrors] = useState([])

  const handleValidationErrors = () => {
    const errors = [];
    if (!review.length) errors.push('Please enter a review')
    if (stars <= 0 || stars > 5) errors.push('Please enter a rating from 1 to 5')
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = handleValidationErrors();
    console.log('VALIDATION ERRORS FOR CREATE REVIEW FORM: ', validationErrors);
    if (validationErrors.length) return setValidationErrors(validationErrors);

    const reviewData = {
      review: review,
      stars: stars
    }

    console.log('DISPATCHING CREATE REVIEW')
    dispatch(createReviewBySpotId(spotId, reviewData))
      .then(() => dispatch(getSpotById(spotId)));

    setReview('')
    setStars(5)
    setValidationErrors([])

    history.push(`/spots/${spotId}`)
  }


  return (
    <div>
      <h4>Review {spotInfo.Owner.firstName}'s Spot {spotInfo.name}</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review">Review</label>
        <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)}/>
        <label htmlFor="stars">Stars</label>
        <input id="stars" type="numeric" min={1} max={5} value={stars} onChange={(e) => setStars(e.target.value)}></input>
        <button>Submit Review</button>
        {validationErrors.length > 0 && (
          <div>
            <ul>
              {validationErrors.map(error => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateReviewForm;
