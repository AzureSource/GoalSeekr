import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import hatArr from './hatListObject.js';
import {Button, Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';

//galaxyID passed in as prop
const ChooseHat = ( {gId, setHatModal} ) =>  {

  const allHats = hatArr;
  //state for the hatlist and the selected hat
  var [chosenHats, setChosenHats] = useState(['x', 'x', 'x']);
  console.log(chosenHats);
  const [hatPick, selectHat] = useState(null);
  const {id} = useParams();

  //fetch hats for the galaxy and assign the hats to state
  const getChosenHats = () => {
    axios.get(`/api/hats/${gId}`)
      .then(({data}) => {
        // console.log('SUCCESS HATS', data.rows);
        if (data.rows.length) {
          setChosenHats(data.rows.map((row) => (row.hat_id)));
        }
        // console.log(chosenHats);
      })
      .catch((err) => {
        console.log(err);
        console.log('FAILURE HATS');
      });
  };

  //confirm the choice, post to DB (need to adjust/fix the body object based on table setup)
  const confirmHat = () => {
    if (!hatPick){
      return alert('you must Select a hat, loser!');
    } else {
      axios.put(`/api/hats/${hatPick.id}/${id}/${gId}`)
        .then((res) =>  {
          setHatModal(false);
        // console.log(`Hat choice confirmed in DB`, res);
        })
        .catch((err) => console.log(err));
    }
  };

  //call fetching function after mount
  useEffect( () => {
    getChosenHats(gId), [gId];
  }, []);

  return (
    //container for list of hats (still need to filter out the ones already selected unless the query does)
    <div id='hat-div'>
      <span id='hat-list-title'>Select Planet Hat</span>
      <ul className='hat-list1'>
        {allHats.map((hat, ind) => {
          return (
            <>
              <img
                key={`img1-${ind}`}
                className={'hat-list-icon'}
                alt='hat-icon'
                src={hat.name}
              ></img>
              {(!chosenHats.includes(hat.id)) &&
                <input
                  className='selectHatButtons1'
                  key={`input1-${ind}`}
                  type="radio"
                  name='hatPicker'
                  onClick={((e) => selectHat(hat))}
                ></input>
              }
            </>
          );

        })}
      </ul>
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

ChooseHat.propTypes = {
  gId: PropTypes.number.isRequired,
  setHatModal: PropTypes.func.isRequired,
};

export default ChooseHat;
