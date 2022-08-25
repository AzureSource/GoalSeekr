/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react';

export default function ShipListEntry({ shipList, handleShipSelection }) {

  const newShipList = Object.keys(shipList).map((shipName) => {
    let count = 0;
    let ids = [];
    let powerLevel = 0;
    let currentShipList = shipList[shipName];

    switch (shipName) {
    case 'Fighter':
      count = currentShipList.length;
      for (let i = 0; i < currentShipList.length; i++) {
        ids.push(currentShipList[i].id);
        powerLevel += currentShipList[i].power;
      }
      break;
    case 'Scout':
      count = currentShipList.length;
      for (let i = 0; i < currentShipList.length; i++) {
        ids.push(currentShipList[i].id);
        powerLevel += currentShipList[i].power;
      }
      break;
    case 'Mothership':
      count = currentShipList.length;
      for (let i = 0; i < currentShipList.length; i++) {
        ids.push(currentShipList[i].id);
        powerLevel += currentShipList[i].power;
      }
      break;
    default:
      break;
    }

    return ({
      name: shipName,
      ids: ids,
      count: count,
      power: powerLevel
    });
  });

  return (
    <TableContainer className='sh'>
      <Table variant="simple">
        <TableCaption>Choose a ship to send on a mission.</TableCaption>
        <Thead>
          <Tr>
            <Th>Count</Th>
            <Th>Ship</Th>
            <Th>Power Level</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newShipList === undefined ? 'There are no fleets at this planet.' : (
            newShipList.map((ship, index) => {
              return (
                <Tr key={index} onClick={() => { handleShipSelection(ship); }}
                  className="ship-selection"
                >
                  <Td>{ship.count}</Td>
                  <Td>{ship.name}</Td>
                  <Td>{ship.power}</Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

// ShipListEntry.propTypes = {
//   shipList: PropTypes.shape({ subProp: PropTypes.string }).isRequired,
// };