import React, { useState } from 'react';
import {Button, Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import TaskTracker from './TaskTracker.jsx';

const TaskModal = () => {
  const [taskUpdated] = useState(false);
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
          backdropFilter='blur(.9px) hue-rotate(10deg)'
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
          <ModalBody h="100%">
            <TaskTracker taskUpdated={taskUpdated}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
};

export default TaskModal;
