import React, {useState, createContext} from 'react';
import Ship from './Ship.jsx';
import shipImg from '../../../assets/ship.png';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Wrap, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';

export const BuildShipContext = createContext(null);

const BuildShip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userCurrency, setUserCurrency] = useState(100000);
  const originUserCurrency = userCurrency;

  const shipsFromBackend = Array(12).fill({
    id: 1,
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    name:'destroyer',
    cost: 300,
    rangeCapacity: 300,
    healthLevel: 300,
    powerLevel: 40});

  const ships = shipsFromBackend.map(shipFromBackend => (
    <Ship key={shipFromBackend.id} shipFromBackend={shipFromBackend} />
  ));

  // const handleUserCurrencyChange = (event, key) => {
  //   event.preventDefault();
  //   if (event.target.id === 'plus') {
  //     if (userCurrency) return true;
  //   } else if (event.target.id === 'minus') {
  //     return true;
  //   }
  // };

  // TODO: restore origin currency from server
  const restoreCurrency = () => {
    // console.log(':::::::::');
    console.log('originUserCurrency is ', originUserCurrency);
    setUserCurrency(originUserCurrency);
    onClose();
  };

  return (
    <>
      <BuildShipContext.Provider value={{userCurrency, setUserCurrency}}>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal onClose={restoreCurrency} size='full' isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Available Ship</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Wrap justify='center'>
                {ships}
              </Wrap>
              <br/>
              <br/>
              <Box bg='tomato' w='100%' p={4} color='white'>
              Your available currency is : ${userCurrency}
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