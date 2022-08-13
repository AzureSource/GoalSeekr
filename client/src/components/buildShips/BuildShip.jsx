import React from 'react';
import Ship from './Ship.jsx';
import shipImg from '../../../assets/ship.png';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Wrap, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';

const BuildShip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shipsFromBackend = [{
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 1,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 3,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 4,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  },
  {
    imageUrl: shipImg,
    imageAlt: 'Rear view of modern home with pool',
    costs: 300,
    range: 200,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    id: 2,
    power: 40,
  }
  ];

  const ships = shipsFromBackend.map(shipFromBackend => (
    <Ship key={shipFromBackend.id} shipFromBackend={shipFromBackend} />
  ));

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal onClose={onClose} size='full' isOpen={isOpen}>
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
            Your available currency is : $10000000
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BuildShip;