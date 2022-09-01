/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react';

export default function ShipListEntry({ shipList, handleShipSelection }) {

  const [selectedShipKey, setSelectedShipKey] = useState();
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

  const selectShip = (ship, i) => {
    handleShipSelection(ship);
    setSelectedShipKey(i);
  };

  return (
    <TableContainer className='sh'
      overflowX='hidden'
    >
      <Table variant="simple" size='md'>
        <TableCaption>Choose a ship to send on a mission.</TableCaption>
        <Thead>
          <Tr
            textAlign='center'
            w='100%' fontFamily='Abril Fatface'
          >
            <Th className='th-ship-stats'>Count</Th>
            <Th className='th-ship-stats'>Ship</Th>
            <Th className='th-ship-stats'>Power Level</Th>
          </Tr>
        </Thead>
        <Tbody w='100%'>
          {newShipList === undefined ? 'There are no fleets at this planet.' : (
            newShipList.map((ship, index) => {
              return (
                <Tr key={index} onClick={() => { selectShip(ship, index); }}
                  className={index === selectedShipKey? 'ship-selection-selected ship-selection' :'ship-selection'}
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

ShipListEntry.propTypes = {
  shipList: PropTypes.object.isRequired,
  handleShipSelection: PropTypes.func.isRequired,
};