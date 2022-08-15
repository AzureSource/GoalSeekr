import React from 'react';
import TitleBar from './components/Lobby/TitleBar.jsx';
import Menu from './components/Lobby/Menu.jsx';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import LoginAuth from './components/Login/LoginAuth.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';

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

// const App = () => {

//   return (
//     <HashRouter>
//       <div className='appBackground'>
//         <TitleBar />
//         <Routes>
//           <Route exact path="/" element={<LoginAuth />} />
//           <Route exact path="/galaxy/uid/:id" element={<CreateGalaxy />} />
//         </Routes>
//       </div>
//     </HashRouter>
//   );

// };

export default App;
