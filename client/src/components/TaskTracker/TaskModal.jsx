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
        Tasks
      </Button>

      <Modal className='tasks-modal'
        isOpen={isOpen} onClose={onClose} color="rgba(80,182,171)"
      >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='10%'
          backdropBlur='2px'
        />
        <ModalContent className="tasks-modal-content"
          h="70%" w="85%" maxWidth="85%" top="50px"
          backgroundColor="#2e2f47"
        >
          <ModalHeader className="tasks-modal-header"
            color='rgba(80,182,171)' textAlign='center' paddingBottom="0rem"
            fontSize="1.5rem"
          >
            Task Tracker
          </ModalHeader>
          <ModalCloseButton color='rgba(80,182,171)'/>
          <ModalBody>
            <TaskTracker />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
};

export default TaskModal;