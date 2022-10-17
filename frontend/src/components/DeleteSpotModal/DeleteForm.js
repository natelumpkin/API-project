import { useDispatch } from "react-redux";
import { useState } from "react";

import { deleteSpotById } from "../../store/spot";

const DeleteForm = () => {
  const [checked, setChecked] = useState(false);
  console.log(checked);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {

    console.log('Deleting spot!!')
    dispatch(deleteSpotById())
  }

  return (
    <div>
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
      <button
        onClick={handleSubmit}
        disabled={checked ? false : true}>Permanently Deactivate</button>
    </div>
  )
}

export default DeleteForm;
