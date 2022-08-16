import React from 'react';
import Title from './components/Lobby/TitleBar.jsx';
import Menu from './components/Lobby/Menu.jsx';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MenuSide from './components/Galaxy Window/MenuSide.jsx';
import MenuBottom from './components/Galaxy Window/MenuBottom.jsx';

const App = () => {

  return (
    <div className='appBackground'>
      <div className='app'>
        <GalaxyWindow className='galaxyWindow' />
      </div>
      {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
      {/* <CreateGalaxy /> */}
      {/* <Title /> */}
      {/* <Menu /> */}
    </div>
  );

};

export default App;


{/* <TransformWrapper>
<MenuSide />
<TransformComponent>
  <GalaxyWindow className='galaxyWindow' />
</TransformComponent>
<MenuBottom />
</TransformWrapper> */}
