import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

//galaxyID passed in as prop
const ChooseHat = ( {gId} ) =>  {

  //have useEffect() function below to call API request on mounting, if thatll work.
  //Othewise, could juft have selecting a hat change the state of the Parent component, causing
  //it to no longer render

  //state for the hatlist and the selected hat
  const [hats, assignHats] = useState([]);
  const [hatPick, selectHat] = useState([]);

  //fetch hats for the galaxy and assign the hats to state
  const fetch = () => {
    axios.get(`/hats/${gId}`)
      .then((res) => {
        console.log(res);
        assignHats(res.data.hats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //call fetching function after mount
  const useEffect = (() => fetch(gId), [gId]);

  //confirm the choice, post to DB (need to adjust/fix the body object based on table setup)
  const confirmHat = () => {
    axios.put('/hat', {params: {hat: hatPick, user: 'user_id'}})
    .then((res) => console.log(`Hat choice confirmed in DB`, res))
    .catch((err) => console.log(err));
  };


  return (
    //container for list of hats (still need to filter out the ones already selected unless the query does)
    <div id='hat-div'>
      {hats.map((hat, ind) => {
        if (hat.isNotTaken) {
          <img
            key={gId + ind}
            className={'hat-list-icon'}
            alt='hat-icon'
            src={`https://media.istockphoto.com/photos/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-picture-id1154370446`}
            //assigns the clicked on hate to state (hatPick)
            onClick={(e) => selectHat(e.target)}
          />;
        } else {
          //could render something in place of icon or maybe same thing with different classname/styling
          <Box
            key={gId + ind}
            className={'hat-list-icon'}
            alt='hat-icon-taken' />;
        }
      })}
      <button
        id='confirm-hat'
        //confirms hatPick firing the post request to DB
        onClick={confirmHat}
      >
        Confirm
      </button>
    </div>
  );


};

export default ChooseHat;

ChooseHat.propTypes = {
  gId: PropTypes.number,
};