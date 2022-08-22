/* eslint-disable react/prop-types */
import React, { useState, useContext} from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {Box, Image, Badge, WrapItem, Button, Flex, Tag} from '@chakra-ui/react';
import { BuildShipContext } from './BuildShip.jsx';


const Ship = ({ shipFromBackend }) => {
  const [shipCount, setShipCount] = useState(0);

  const {userCurrency, setUserCurrency, purchasedShips, setPurchasedShips} = useContext(BuildShipContext);

  const upsert = (array, element) => {
    const i = array.findIndex(_element => _element.name === element.name);
    if (i > -1) array[i] = element;
    else array.push(element);
  };

  // handle plus/minus button click
  const handleShipAmountChange = (event) => {
    if (event.target.id === 'plus') {
      if (userCurrency - shipFromBackend.cost < 0) {
        alert('Cannot purchase more, insufficient currency');
        return;
      } else {
        setUserCurrency(userCurrency - shipFromBackend.cost);
        setShipCount(shipCount + 1);
        // update ship purchased during this execution
        let shipPurchased = {name: shipFromBackend.name, count: shipCount + 1};
        let updatedPurchasedShips = purchasedShips;
        // create new if not exist, or update if exist
        upsert(updatedPurchasedShips, shipPurchased);
        setPurchasedShips(updatedPurchasedShips);
      }
    } else if (event.target.id === 'minus') {
      if (shipCount <= 0) {
        alert('Ship number is already 0');
        return;
      } else {
        setUserCurrency(userCurrency + shipFromBackend.cost);
        setShipCount(shipCount - 1);
        let shipPurchased = {name: shipFromBackend.name, count: shipCount + 1};
        let updatedPurchasedShips = purchasedShips;
        upsert(updatedPurchasedShips, shipPurchased);
        setPurchasedShips(updatedPurchasedShips);
      }
    }
  };

  return (
    <Flex
      fontFamily='Abril Fatface'
    >
      <Box
        fontFamily='Abril Fatface'
        className='ship-boxes' overflow='hidden'
      >
        <Image src={shipFromBackend.imageUrl} alt={shipFromBackend.imageAlt} />

        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' backgroundColor='rgba(80,182,171)'>
              {shipFromBackend.name}
            </Badge>
            <Box
              color='rgba(80,182,171)'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              fontFamily='Abril Fatface'
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
        <Flex gap='2' justify='center' alignItems='center' mb='.5rem'>
          <Box alignItems='center'>
            <FiMinus
              id='minus'
              color='rgba(80,182,171)'
              className='minusShip'
              onClick={(event) => handleShipAmountChange(event)}
            />
          </Box>
          <Box>
            <Tag
              size='lg' variant='solid'
              backgroundColor='rgba(80,182,171)'
              alignItems='center'
            >
              {shipCount}
            </Tag>
          </Box>
          <Box alignItems='center'>
            <FiPlus
              id='plus'
              color='rgba(80,182,171)'
              className='plusShip'
              onClick={(event) => handleShipAmountChange(event)}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Ship;