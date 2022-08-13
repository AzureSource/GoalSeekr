/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {Box, Image, Badge, WrapItem} from '@chakra-ui/react';

class Ship extends Component {

  render() {
    const { shipFromBackend } = this.props;

    return (
      <WrapItem>
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={shipFromBackend.imageUrl} alt={shipFromBackend.imageAlt} />

          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                New
              </Badge>
              <Box
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='2'
              >
                Costs: {shipFromBackend.costs}  &bull; Range: {shipFromBackend.range} &bull; Power: {shipFromBackend.power}
              </Box>
            </Box>
          </Box>
        </Box>
      </WrapItem>
    );
  }
}

export default Ship;