
// takes multi decimal from raw data and converts it into two decimals

const formatAvgRating = (rating) => {
  // turn rating into a string
  let stringRating = rating.toString();
  // split on the period
  let ratingArr = stringRating.split('.');
  // slice off everything past index 1
  if (ratingArr.length === 1) {
    return ratingArr[0];
  } else if (ratingArr[1][0] === '0') {
    return ratingArr[0]
  } else {
    let decimals = ratingArr[1].slice(0,2);
    return ratingArr[0] + '.' + decimals;
  }
  // join first half and second half and return it
}

export default formatAvgRating;
