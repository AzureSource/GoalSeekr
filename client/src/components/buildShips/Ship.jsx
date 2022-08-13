/* eslint-disable react/prop-types */
import React, { useState, useContext} from 'react';
import {Box, Image, Badge, WrapItem, Button, Flex, Tag} from '@chakra-ui/react';
import { BuildShipContext } from './BuildShip.jsx';


const Ship = ({ shipFromBackend }) => {
  const [shipCount, setShipCount] = useState(0);

  const {userCurrency, setUserCurrency} = useContext(BuildShipContext);

  const handleShipAmountChange = (event) => {
    if (event.target.id === 'plus') {
      if (userCurrency - shipFromBackend.cost < 0) {
        alert('Cannot purchase more, insufficient currency');
        return;
      } else {
        setUserCurrency(userCurrency - shipFromBackend.cost);
        setShipCount(shipCount + 1);
      }
    } else if (event.target.id === 'minus') {
      if (shipCount <= 0) {
        alert('Ship number is already 0');
        return;
      } else {
        setUserCurrency(userCurrency + shipFromBackend.cost);
        setShipCount(shipCount - 1);
      }
    }

  };

  return (
    <WrapItem>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={shipFromBackend.imageUrl} alt={shipFromBackend.imageAlt} />

        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {shipFromBackend.name}
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              cost: {shipFromBackend.cost}
              &bull; Range: {shipFromBackend.rangecapacity}
              <br/>
              Power: {shipFromBackend.powerlevel}
              &bull; Health: {shipFromBackend.healthlevel}
            </Box>
          </Box>
        </Box>
        <Flex gap='2' justify='center' alignItems='center'>
          <Box>
            <Button id='minus' onClick={(event) => handleShipAmountChange(event)}>-</Button>
          </Box>
          <Box>
            <Tag size='lg' variant='solid' colorScheme='teal'>{shipCount}</Tag>
          </Box>
          <Box>
            <Button id='plus' onClick={(event) => handleShipAmountChange(event)}>+</Button>
          </Box>
        </Flex>
      </Box>
    </WrapItem>
  );
};

export default Ship;