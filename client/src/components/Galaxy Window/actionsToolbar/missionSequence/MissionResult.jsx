import React from 'react';

import {Button, Modal, ModalOverlay, ModalContent, Box,
  Wrap, ModalHeader,
  ModalFooter, ModalCloseButton, ModalBody, useDisclosure} from '@chakra-ui/react';

const MissionResult = () => {

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Button
        className='build-modal-btn'
        onClick={onClose}
      >
        Build ship
      </Button>
      <Modal onClose={onClose} size='full' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent backgroundColor='rgba(46,47,71,255)' >
          <ModalHeader color='gray.500'>Available Ship</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap justify='center'>
              test-------------------
            </Wrap>
            <br/>
            <br/>
            <Box bg='teal' w='100%' p={4} color='white'>
            Your available currency is : $
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme='teal'>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};