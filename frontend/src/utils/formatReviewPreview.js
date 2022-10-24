const formatReviewPreview = (review) => {

  if (review) review = review.toString();
  if (!review) return;

  if (review.length > 120) {
    return review.slice(0, 120) + "...";
  } else {
    return review;
  }
}

export default formatReviewPreview;
