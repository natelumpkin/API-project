import { Link } from "react-router-dom";



const EditConfirmation = ({spot, setShowConfirmationModal}) => {
  return (
    <div className="delete-review-holder">
      <div className="delete-review signup-exit-holder">

        <div onClick={() => setShowConfirmationModal(false)} className="circle delete-review">
        <i id="exit-reviews" className="fa-solid fa-xmark"></i>
        </div>

      </div>
      <div>
        <div>
        <h4>Successfully changed reservation at {spot.Owner.firstName}'s listing "{spot.name}"</h4>
        </div>
        <div className="delete-review-bottom-navigation">
              <div>
              {"< "}<Link className="underline" onClick={() => setShowConfirmationModal(false)}>Back</Link>
              </div>
              <Link
                id="reservation-confirmation-link"
                className="delete-review-button-perm"
                to="/trips"
                >View Upcoming Trips</Link>
            </div>
      </div>
    </div>
  )
}

export default EditConfirmation;
