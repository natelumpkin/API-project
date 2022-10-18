import { Link } from "react-router-dom";

import formatAvgRating from "../../../utils/formatAvgRating";

const SpotCard = ({ spot }) => {
  // console.log('SPOT CARD spot PROP: ', spot)
  //console.log('SPOT CARD SPOT: ', spot)

  let formattedAvgRating;
  if (spot.avgRating) formattedAvgRating = formatAvgRating(spot.avgRating)

  return (
    <Link to={`/spots/${spot.id}`}>
      <div className="spotcard-top-holder">
        <div className="spotcard-preview-image-holder">
          <img src={spot.previewImage} alt='preview image of spot'/>
        </div>
      <div className="spotcard-bottom-holder">
        <div>{spot.city},{spot.state}</div>
        <div>{formattedAvgRating} <i className="fa-solid fa-star"></i></div>
        <div>${spot.price} night</div>
      </div>
      </div>
    </Link>
  )
};

export default SpotCard;
