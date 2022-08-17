/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react';

export default function ShipListEntry({ shipList, handleShipSelection }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Choose a ship to send on a mission.</TableCaption>
        <Thead>
          <Tr>
            <Th>Count</Th>
            <Th>Ship</Th>
            <Th>Type</Th>
            <Th>Power Level</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shipList.map((ship, index) => {
            return (
              <Tr key={index} onClick={() => {handleShipSelection(ship);}}>
                <Td>{ship.count}</Td>
                <Td>{ship.name}</Td>
                <Td>{ship.type}</Td>
                <Td>{ship.power}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

// ShipListEntry.propTypes = {
//   shipList: PropTypes.shape({ subProp: PropTypes.string }).isRequired,
// };