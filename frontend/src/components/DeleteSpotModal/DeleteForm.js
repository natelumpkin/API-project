import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { deleteSpotById } from "../../store/spot";

const DeleteForm = ({spotId}) => {
  const [checked, setChecked] = useState(false);


  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {

    dispatch(deleteSpotById(spotId))
    history.push('/')
  }

  return (
    <div>
      <div>

      </div>
      <h1>One last step</h1>
      <h4>Listing deactivation is permanent—so if you want to keep your info, you should not deactivate your listing.</h4>
      <h4>You’ll lose your listing details</h4>
      <input
        type="checkbox"
        value={checked}
        onChange={() => setChecked(!checked)}
        checked={checked ? true : false}
        />
      <span>I understand that I’ll no longer have access to my listing and listing information.</span>
      <div>
        <Link to={`/spots/${spotId}/edit`}>Back</Link>
        <button
          onClick={handleSubmit}
          disabled={checked ? false : true}>Permanently Deactivate</button>
      </div>
    </div>
  )
}

export default DeleteForm;
