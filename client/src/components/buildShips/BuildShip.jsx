import React, {useState, createContext, useEffect, useContext} from 'react';
import axios from 'axios';
import Ship from './Ship.jsx';
import shipImg from '../../../assets/ship.png';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Wrap, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';
import { UserContext } from '../Galaxy Window/GalaxyWindow.jsx';

export const BuildShipContext = createContext(null);

const BuildShip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userCurrency, setUserCurrency] = useState(0);
  const [purchasedShips, setPurchasedShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [user, setUser] = useState({});
  const uid = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const shipResponse = await axios.get('/api/ships/');
      const userResponse = await axios.get(`/api/users/${uid}`);
      let shipsDB = shipResponse.data;
      let shipsWithImg = shipsDB.map(shipDB => ({...shipDB, imageUrl: shipImg}));
      setShips(shipsWithImg);
      setUser(userResponse.data[0]);
      setUserCurrency(userResponse.data[0].currency);
    };
    fetchData();
  }, []);

  const shipsComponents = ships.map(ship => (
    <Ship key={ship.id} shipFromBackend={ship} />
  ));

  const restoreData = () => {
    setUserCurrency(user.currency);
    setPurchasedShips([]);
    onClose();
  };

  const confirmPurchaseShip = () => {
    console.log('purchased ships ', purchasedShips);
    console.log('userCurrency ', userCurrency);
    let config = {
      data: {
        'ships': purchasedShips
      }
    };
    axios.post(`api/users/${uid}/ships`, config)
      .then(() => {
        console.log('update user info');
        location.reload();
      });
    onClose();
  };

  return (
    <>
      <BuildShipContext.Provider value={{userCurrency, setUserCurrency, user, purchasedShips, setPurchasedShips}}>
        <Button onClick={onOpen}>Build ship</Button>
        <Modal onClose={restoreData} size='full' isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent backgroundColor='rgba(46,47,71,255)' >
            <ModalHeader color='gray.500'>Available Ship</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Wrap justify='center'>
                {shipsComponents}
              </Wrap>
              <br/>
              <br/>
              <Box bg='teal' w='100%' p={4} color='white'>
              Your available currency is : $ {userCurrency}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={confirmPurchaseShip} colorScheme='teal'>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </BuildShipContext.Provider>
    </>
  );
};
export default BuildShip;