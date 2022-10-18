const formatReviewPreview = (review) => {

  if (review) review = review.toString();
  if (!review) return;

  if (review.length > 180) {
    return review.slice(0, 180) + "...";
  } else {
    return review;
  }
}

export default formatReviewPreview;
