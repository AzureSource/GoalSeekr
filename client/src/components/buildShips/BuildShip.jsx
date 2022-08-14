import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import Ship from './Ship.jsx';
import shipImg from '../../../assets/ship.png';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Wrap, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';

export const BuildShipContext = createContext(null);

const BuildShip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userCurrency, setUserCurrency] = useState(100000);
  const [ships, setShips] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const shipResponse = await axios.get('/api/ships/');
      const userResponse = await axios.get('/api/users/1');
      let shipsDB = shipResponse.data;
      let shipsWithImg = shipsDB.map(shipDB => ({...shipDB, imageUrl: shipImg}));
      setShips(shipsWithImg);
      setUser(userResponse.data[0]);
    };
    fetchData();
  }, []);

  const shipsComponents = ships.map(ship => (
    <Ship key={ship.id} shipFromBackend={ship} />
  ));

  return (
    <>
      <BuildShipContext.Provider value={{userCurrency, setUserCurrency, user}}>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal onClose={onClose} size='full' isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Available Ship</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Wrap justify='center'>
                {shipsComponents}
              </Wrap>
              <br/>
              <br/>
              <Box bg='tomato' w='100%' p={4} color='white'>
              Your available currency is : $ {user.currency}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme='red'>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </BuildShipContext.Provider>
    </>
  );
};
export default BuildShip;