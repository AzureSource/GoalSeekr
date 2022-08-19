import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import Ship from './Ship.jsx';
import attackPic from '../../../assets/ships/attackPic.png';
import mothershipPic from '../../../assets/ships/mothershipPic.png';
import scoutPic from '../../../assets/ships/scoutPic.png';
import tankPic from '../../../assets/ships/tankPic.png';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Flex, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const BuildShipContext = createContext(null);

const BuildShip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userCurrency, setUserCurrency] = useState(0);
  const [purchasedShips, setPurchasedShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [user, setUser] = useState({});
  const {id} = useParams();

  const planetIdSelected = useSelector((state) => state.denseGalaxyPlanetSelection.planetSelection.planetIdSelected);

  // console.log('planetIdSelected is ', planetIdSelected);

  useEffect(() => {
    const fetchData = async () => {
      const shipResponse = await axios.get('/api/ships/');
      const userResponse = await axios.get(`/api/users/${id}`);
      let shipsDB = shipResponse.data;
      let shipsWithImg = shipsDB.map(shipDB => {
        var shipWithImg = {...shipDB};
        shipWithImg.imageUrl = attackPic;
        switch (shipWithImg.name) {
        case 'Scout':
          shipWithImg.imageUrl = scoutPic;
          break;
        case 'Fighter':
          shipWithImg.imageUrl = attackPic;
          break;
        case 'Mothership':
          shipWithImg.imageUrl = mothershipPic;
          break;
        case 'Tank':
          shipWithImg.imageUrl = tankPic;
          break;
        default:
          shipWithImg.imageUrl = tankPic;
        }
        return shipWithImg;
      });
      setShips(shipsWithImg);
      setUser(userResponse.data[0]);
      setUserCurrency(userResponse.data[0].currency);
    };
    fetchData();
  }, []);

  const handleOpenClick = () => {
    // if (planetIdSelected === null || planetIdSelected === 0) {
    //   alert('To start building ship, please select a planet first');
    //   return;
    // } else {
    //   onOpen();
    // }
    onOpen();
  };

  const shipsComponents = ships.map(ship => (
    ship.name === 'Tank' ? null :
      <Ship key={ship.id} shipFromBackend={ship} />
  ));

  const restoreData = () => {
    let tempCurrency = 0;
    if (user) {
      tempCurrency = user.currency;
    }
    setUserCurrency(tempCurrency);
    setPurchasedShips([]);
    onClose();
  };

  const confirmPurchaseShip = () => {
    // console.log('purchased ships ', purchasedShips);
    // console.log('userCurrency ', userCurrency);
    let config = {
      data: {
        'planetId': planetIdSelected,
        'ships': purchasedShips
      }
    };
    axios.post(`api/users/${id}/ships`, config)
      .then(() => {
        console.log('update user info');
        location.reload();
      });
    onClose();
  };

  return (
    <>
      <BuildShipContext.Provider value={{userCurrency, setUserCurrency, user, purchasedShips, setPurchasedShips}}>
        <Button
          className='build-modal-btn'
          onClick={handleOpenClick}
        >
          Build ship
        </Button>
        <Modal
          className='build-ship-modal'
          size='l'
          onClose={restoreData}
          isOpen={isOpen}>
          <ModalOverlay
            backdropFilter='blur(.9px) hue-rotate(10deg)'
          />
          <ModalContent
            className='ship-modal-content'
          >
            <ModalHeader color='rgba(80,182,171)' textAlign='center'>Build Ships</ModalHeader>
            <ModalCloseButton className='build-ship-close'/>
            <ModalBody>
              <Flex className='ship-box-containers'>
                {shipsComponents}
              </Flex>
              <br/>
              <Flex className=''>
                <Box bg='rgba(80,182,171)' p={4} color='white'>
                  Your available currency is : $ {userCurrency}
                </Box>
                <Button onClick={confirmPurchaseShip} colorScheme='teal'>Confirm</Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </BuildShipContext.Provider>
    </>
  );
};
export default BuildShip;
