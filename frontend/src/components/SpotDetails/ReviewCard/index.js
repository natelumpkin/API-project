import { useSelector } from "react-redux";

import getMonthFromDate from "../../../utils/getMonthFromDate";

// Individual Review Card containing userName, date Review was made,
// and preview of review text

const ReviewCard = ({review}) => {

  let formattedDate = getMonthFromDate(review.createdAt)

  console.log('REVIEW CARD prop: ', review)

  return (
    <div>
      <div className="flex-column">
        <h4>{review.User.firstName}</h4>
        <h5>{formattedDate}</h5>
      </div>
      <div>
        <p>{review.review}</p>
      </div>
    </div>
  )
}

export default ReviewCard;
