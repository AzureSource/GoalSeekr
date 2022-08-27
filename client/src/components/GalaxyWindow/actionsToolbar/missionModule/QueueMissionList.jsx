import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';

const QueueMissionList = ({ missionQueue, editMission }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay backdropFilter='blur(.9px) hue-rotate(10deg)'/>
        <ModalContent
          h="70%" w="85%" maxWidth="85%" top="50px"
          backgroundColor="#2e2f47"
        >
          <ModalHeader
            color='rgba(80,182,171)' textAlign='center' paddingBottom="0rem"
            fontSize="1.5rem"
          >Missions List</ModalHeader>
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