import { csrfFetch } from "./csrf";

import normalizeReviews from "./utils/normalizeReviews";

const USER_REVIEWS = '/reviews/getCurrentUserReviews';
const SPOT_REVIEWS = '/reviews/getReviewsBySpotId';
const CREATE_REVIEW = '/reviews/createReviewBySpotId';
const DELETE_REVIEW = '/reviews/deleteReviewById';
const ADD_REVIEW_IMAGE = 'reviews/addReviewImage';
const DELETE_REVIEW_IMAGE = 'reviews/deleteReviewImage';

// ACTION CREATORS

const loadUserReviews = (reviewData) => {
  return {
    type: USER_REVIEWS,
    reviewData
  }
};

const loadSpotReviews = (reviewData) => {
  return {
    type: SPOT_REVIEWS,
    reviewData
  }
};

const addReview = (reviewData) => {
  return {
    type: CREATE_REVIEW,
    reviewData
  }
};

const removeReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
};

const addImage = (imageData) => {
  return {
    type: ADD_REVIEW_IMAGE,
    imageData
  }
};

const removeImage = (imageId) => {
  return {
    type: DELETE_REVIEW_IMAGE,
    imageId
  }
};

// THUNKS

export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch('api/reviews/current');

  const reviewData = await response.json();

  dispatch(loadUserReviews(reviewData));

  return reviewData;
};

export const getReviewsBySpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviewData = await response.json();
    dispatch(loadSpotReviews(reviewData));
    return reviewData;
  }
  else {
    const errorMessage = await response.json()
    return errorMessage;
  }
}

export const createReviewBySpotId = (spotId, reviewData) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
    body: JSON.stringify(reviewData)
  });

  if (response.ok) {
    const reviewData = await response.json();
    dispatch(addReview(reviewData));
    return reviewData;
  }
  else {
    const errorMessage = await response.json()
    return errorMessage;
  }
}

// DEMO-DATA FOR REVIEW BODY

const review = {
  review: 'This is a test review',
  stars: 3
}

// INITIAL STATE AND REDUCER

const initialState = {
  spot: {}, // object containing spot's reviews by review Id
  user: {} // object containing user's reviews
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REVIEWS: {
      const newState = {
        spot: {},
        user: {}
      };
      // load in Spot Reviews from previous state
      for (let spotReviewId in state.spot) {
        newState.spot[spotReviewId] = {
          ...state.spot[spotReviewId],
          User: {
            ...state.spot[spotReviewId].User
          },
          ReviewImages: [
            ...state.spot[spotReviewId].ReviewImages
          ]
        }
      }
      // Add normalized user data under user key
      newState.user = normalizeReviews(action.reviewData);
      return newState;
    }
    case SPOT_REVIEWS: {
      const newState = {
        user: {},
        spot: {}
      };
      for (let userReviewId in state.user) {
        newState.user[userReviewId] = {
          ...state.user[userReviewId],
          User: {
            ...state.user[userReviewId].User
          },
          ReviewImages: [
            ...state.user[userReviewId].ReviewImages
          ]
        }
      }
      newState.spot = normalizeReviews(action.reviewData);
      return newState;
    };
    case CREATE_REVIEW: {
      const newState = {
        user: {},
        spot: {}
      }
    // maintain state in user reviews
    for (let userReviewId in state.user) {
      newState.user[userReviewId] = {
        ...state.user[userReviewId],
        User: {
          ...state.user[userReviewId].User
        },
        ReviewImages: [
          ...state.user[userReviewId].ReviewImages
        ]
      }
    }
    // maintain state in spot reviews
    for (let spotReviewId in state.spot) {
      newState.spot[spotReviewId] = {
        ...state.spot[spotReviewId],
        User: {
          ...state.spot[spotReviewId].User
        },
        ReviewImages: [
          ...state.spot[spotReviewId].ReviewImages
        ]
      }
    }
    // add review data as new ID in spot reviews
    newState.spot[action.reviewData.id] = action.reviewData;
    // make sure empty array exists under ReviewImages
    if (!newState.spot[action.reviewData.id.ReviewImages]) {
      newState.spot[action.reviewData.id.ReviewImages] = [];
    }
    return newState;
    }
    default: {
      return state;
    }
  }
}

export default reviewReducer;
