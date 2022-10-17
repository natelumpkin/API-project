import { useDispatch, useSelector } from "react-redux";

import SpotCard from "./SpotCard";

const LandingPage = () => {
  // landing page will display on map at exact route '/'
  // display a div with a map of spotcards
  // one spotcard for each spot in getAllSpots

  // get the list of all spots by dispatching getallspots thunk on load
  // listen for changes in case a spot is deleted
  const state = useSelector(state => state)


  return (
    <div>
    </div>
  )
};

export default LandingPage;
