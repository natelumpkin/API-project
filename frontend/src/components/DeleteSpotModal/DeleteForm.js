import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { deleteSpotById } from "../../store/spot";
import './DeleteForm.css';

const DeleteForm = ({spotId, setShowModal}) => {
  const [checked, setChecked] = useState(false);


  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {

    dispatch(deleteSpotById(spotId))
    history.push('/')
  }

  return (
          <div className="delete-holder">
            <div className="exit-holder">
              <div onClick={() => setShowModal(false)} className="circle">
              <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="delete-alerts-holder">
            <h1 id="one-last-step">One last step</h1>
            <h4 className="delete-alert">Listing deactivation is permanent—so if you want to keep your info, you should not deactivate your listing.</h4>
            <h4 className="delete-alert"><i className="red fa-solid fa-circle-exclamation"></i> You’ll lose your listing details</h4>
            <div>
            <div className="checkbox">
            <input
              type="checkbox"
              className="delete-checkbox"
              value={checked}
              onChange={() => setChecked(!checked)}
              checked={checked ? true : false}
              />
            <span className="delete-alert">I understand that I`ll no longer have access to my listing and listing information.</span>
            </div>
            </div>
            </div>
            <div className="bottom-navigation">
              <div>
              {"< "}<Link className="underline" onClick={() => setShowModal(false)}>Back</Link>
              </div>
              <button
                className="delete-button"
                onClick={handleSubmit}
                disabled={checked ? false : true}>Permanently Deactivate</button>
            </div>
          </div>
  )
}

export default DeleteForm;
