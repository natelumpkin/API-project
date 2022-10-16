import { csrfFetch } from "./csrf";



const initialState = {
  spot: {}, // object containing spot's reviews by review Id
  user: {} // object containing user's reviews
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default reviewReducer;
