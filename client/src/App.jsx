import React from 'react';
import { AspectRatio } from '@chakra-ui/react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import '../assets/login.css';
import ChooseHat from './components/ChooseHat.jsx';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import LoginAuth from './components/Login/LoginAuth.jsx';
import Menu from './components/Lobby/Menu.jsx';
import TitleBar from './components/Lobby/TitleBar.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {

  return (
    <div className='appBackground'>
      <div className='app'>
        <GalaxyWindow className='galaxyWindow' />
        <LoginAuth />
        <ChooseHat gId={3} />
      </div>
      {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
      {/* <CreateGalaxy /> */}
      {/* <Title /> */}
      {/* <Menu /> */}
    </div>
  );

};



export default App;
