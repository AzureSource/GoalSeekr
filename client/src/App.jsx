import React, { useState, useEffect } from 'react';
import TitleBar from './components/Lobby/TitleBar.jsx';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ChooseHat from './components/ChooseHat.jsx';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import EnterGalaxy from './components/Login/EnterGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MenuSide from './components/Galaxy Window/MenuSide.jsx';
import MenuBottom from './components/Galaxy Window/MenuBottom.jsx';
import LoginAuth from './components/Login/LoginAuth.jsx';
import Counter from './components/Galaxy Window/actionsToolbar/missionModule/Counter';

// const App = () => {
//   const [title, setTitle] = useState(true);
//   return (
//     <div className='appBackground'>
//       <div className='app'>
//         <GalaxyWindow setTitle={setTitle} className='galaxyWindow' />
//       </div>
//       {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
//       {/* <CreateGalaxy /> */}
//       {/* <Title /> */}
//       {/* <Menu /> */}
//     </div>
//   );

// };

const App = () => {
const [title, setTitle] = useState(true);

  return (
    <HashRouter>
      <div className='appBackground'>
        {title ? <TitleBar/> : null}
        <Routes>
          <Route exact path="/" element={<LoginAuth setTitle={setTitle}/>} />
          <Route exact path="/entergalaxy/uid/:id" element = {<EnterGalaxy setTitle={setTitle}/>} />
          <Route exact path="/creategalaxy/uid/:id" element={<CreateGalaxy setTitle={setTitle}/>} />
          <Route exact path = "/galaxy/uid/:id" element={<GalaxyWindow setTitle={setTitle}/>} />
          <Route exact path = "/tasks/uid/:id" element={<TaskTracker setTitle={setTitle}/>} />
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
