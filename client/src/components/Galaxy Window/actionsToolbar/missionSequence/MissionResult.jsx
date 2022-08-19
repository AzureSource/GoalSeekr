import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMissionFinished, updateMissionResults, setMissionQueue } from '../missionModule/missionModuleSlice';
import MissionResultTableRow from './MissionResultTableRow.jsx';

const MissionResult = () => {

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  let missionResults = useSelector((state) => state.missionQueue.missionResults);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      toggleMissionFinished('false')
    );
    dispatch(
      updateMissionResults([])
    );
    dispatch(
      setMissionQueue([])
    );
    location.reload();
    // onClose();
  };

  const missionResultComponents = missionResults.map((missionResult, index) => (
    <MissionResultTableRow key={index}
      type={missionResult.type}
      targetPlanetName={missionResult.targetPlanetName}
      result={missionResult.result} />
  ));

  return (
    <>
      <Button
        className='build-modal-btn'
        onClick={handleClose}
      >
        Mission Result
      </Button>
      <Modal onClose={handleClose} size='full' isOpen={isOpen}>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
        <ModalContent backgroundColor='rgba(46,47,71,255)' >
          <ModalHeader color='gray.500'>Mission Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant='striped' colorScheme='teal' color='orange'>
                <Thead>
                  <Tr>
                    <Th>Mission Type</Th>
                    <Th>Target Planet Name</Th>
                    <Th >Mission result</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {missionResultComponents}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} colorScheme='teal'>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MissionResult;