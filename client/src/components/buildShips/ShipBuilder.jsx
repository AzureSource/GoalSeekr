import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'

function ShipBuilder() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Build Your Armada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='sb-upper'>
              //metal cost, currency cost, range, power
              
              //ship1, 2, and 3 (counter for each)

              //buy button
            </div>
          </ModalBody>

          <ModalFooter>
            //buy button
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ShipBuilder;