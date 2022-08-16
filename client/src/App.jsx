import React from 'react';
import TitleBar from './components/Lobby/TitleBar.jsx';
import Menu from './components/Lobby/Menu.jsx';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import EnterGalaxy from './components/Login/EnterGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MenuSide from './components/Galaxy Window/MenuSide.jsx';
import MenuBottom from './components/Galaxy Window/MenuBottom.jsx';
import LoginAuth from './components/Login/LoginAuth.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';

// const App = () => {

//   return (
//     <div className='appBackground'>
//       <div className='app'>
//         <GalaxyWindow className='galaxyWindow' />
//       </div>
//       {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
//       {/* <CreateGalaxy /> */}
//       {/* <Title /> */}
//       {/* <Menu /> */}
//     </div>
//   );

// };

const App = () => {

  return (
    <HashRouter>
      <div className='appBackground'>
        <TitleBar />
        <Routes>
          <Route exact path="/" element={<LoginAuth />} />
          <Route exact path="/entergalaxy/uid/:id" element = {<EnterGalaxy/>} />
          <Route exact path="/creategalaxy/uid/:id" element={<CreateGalaxy />} />
          <Route exact path = "/galaxy/uid/:id" element={<GalaxyWindow />} />
        </Routes>
      </div>
    </HashRouter>
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
