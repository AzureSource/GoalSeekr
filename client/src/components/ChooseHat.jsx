import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import hatArr from './hatListObject.js';
import {Flex, Box, Image, Button, Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';

//galaxyID passed in as prop
const ChooseHat = ( {gId, setHatModal} ) =>  {

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const allHats = hatArr;
  //state for the hatlist and the selected hat
  var [chosenHats, setChosenHats] = useState(['x', 'x', 'x']);
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
    <>
      <Modal
        className='tasks-modal'
        isOpen={isOpen}
        color="rgba(80,182,171)"
      >
        <ModalOverlay
          backdropFilter='blur(.9px) hue-rotate(10deg)'
        />
        <ModalContent className="tasks-modal-content"
          h="fit-content" w="60%" maxWidth="85%" top="105px"
          pb='5px' mb='5px'
          backgroundColor="#2e2f47"
        >
          <ModalHeader className="tasks-modal-header"
            color='rgba(80,182,171)' textAlign='center' paddingBottom="0rem"
            fontSize="1.5rem"
          >
            Select Hat
          </ModalHeader>
          <ModalBody h="100%">
            <Flex flexWrap='wrap' justify='center'>
              {allHats.map((hat, ind) => {
                return (
                  <Flex key={ind}>

                    {(chosenHats.includes(hat.id)) ?
                      <Image
                        className='unavailable-hat hat-images'
                        w='120px'
                        m='10px'
                        objectFit='contain'
                        src={hat.name}
                      >
                      </Image> :
                      <Image
                        className='available-hat hat-images'
                        objectFit='contain'
                        w='120px '
                        m='10px'
                        src={hat.name}
                        onClick={((e) => selectHat(hat))}
                      ></Image>
                    }

                  </Flex>
                );
              })}

            </Flex>
            <Flex justify='center' w='100%'>
              <Button
                id='confirm-hat'
                onClick={confirmHat}
              >
              Confirm
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

ChooseHat.propTypes = {
  gId: PropTypes.number.isRequired,
  setHatModal: PropTypes.func.isRequired,
};

export default ChooseHat;
