import React from 'react';
import { Flex } from '@chakra-ui/react';
// import { signInWithGoogle } from '../../firebase';

const Menu = () => {

  return (
    <Flex
      className='lobby-menu-container'
      justify='center'
      align='center'
    >
      <Flex
        className='lobby-menu'
        justify='center'
        align='center'
      >
        {/* <button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button> */}
      </Flex>
    </Flex>
  );
};

export default Menu;