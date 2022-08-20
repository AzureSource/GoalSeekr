import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { List, ListItem, Flex } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';

const QueueMissionList = ({ missionQueue, editMission }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent backgroundColor='rgba(46,47,71,255)' >
          <ModalHeader color='gray.500'>Queued Missions List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3} id="planet-mission-list">
              <ListItem>
                {missionQueue.map((mission, index) => {
                  let shipData = mission.ship.map((data) => {
                    return (
                      `Count : ${data.count} | Ship : ${data.name} | Power : ${data.power}`
                    );
                  });
                  return (
                    <div key={index}>
                      Home Planet : {mission.start} | Type : {mission.type} | Ships : {shipData} | Target Planet : {mission.target}
                      <div>
                        <Button onClick={() => editMission(index)}>Remove</Button>
                      </div>
                    </div>
                  );
                })}
              </ListItem>
            </List>
            {/* <TableContainer>
              <Table variant='striped' colorScheme='teal' color='orange'>
                <Thead>
                  <Tr>
                    <Th>Mission Type</Th>
                    <Th>Target Planet Name</Th>
                    <Th >Mission result</Th>
                    <Th >Result detail</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {missionResultComponents}
                </Tbody>
              </Table>
            </TableContainer> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme='teal'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default QueueMissionList;