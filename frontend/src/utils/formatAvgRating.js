
// takes multi decimal string or number from raw data and converts it into two decimals

const formatAvgRating = (rating) => {
  //console.log('FORMAT AVG RATING rating VARIABLE: ', rating)
  // console.log('rating: ', rating)
  // console.log(typeof rating)
  let stringRating = rating.toString();
  let ratingArr = stringRating.split('.');

  if (ratingArr.length === 1) {
    return ratingArr[0] + '.0'
  } else if (ratingArr[1][0] === '0') {
    return ratingArr[0] + '.0'
  } else {
    let decimals = ratingArr[1].slice(0,2);
    return ratingArr[0] + '.' + decimals;
  }

}

export default formatAvgRating;
