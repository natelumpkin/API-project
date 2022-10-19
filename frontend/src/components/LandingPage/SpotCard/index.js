import { Link } from "react-router-dom";

import formatAvgRating from "../../../utils/formatAvgRating";

import './SpotCard.css'

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
      </div>
      <div className="spotcard-bottom-holder">
        <div className="flex info-holder">
          <div className="black left">{spot.city}, {spot.state}</div>
          <div className="black right"><i className="fa-solid fa-star"></i> {formattedAvgRating}</div>
        </div>
        <div className="black bottom">${spot.price} night</div>
      </div>
    </Link>
  )
};

export default SpotCard;
