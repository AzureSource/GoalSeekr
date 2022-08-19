import React, { useEffect, useState } from 'react';
import {Button, Modal, ModalOverlay, ModalContent, Box,
  Flex, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';
import TaskTracker from './TaskTracker.jsx';

const TaskModal = () => {
  const [taskUpdated, setTaskUpdated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button className="tasks-modal-btn" onClick={onOpen}>
        Tasksss
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskTracker />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
};

export default TaskModal;