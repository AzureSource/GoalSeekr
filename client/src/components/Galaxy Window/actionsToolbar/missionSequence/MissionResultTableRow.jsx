/* eslint-disable react/prop-types */
import React from 'react';
import {Tr,Td} from '@chakra-ui/react';

const MissionResultTableRow = ({type, targetPlanetName, result}) => {

  return (
    <Tr>
      <Td>{type}</Td>
      <Td>{targetPlanetName}</Td>
      <Td>{result}</Td>
    </Tr>
  );
};

export default MissionResultTableRow;