import React, { useState } from 'react';
import TitleBar from './components/Lobby/TitleBar.jsx';
import '../assets/login.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import EnterGalaxy from './components/Login/EnterGalaxy.jsx';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';'react-zoom-pan-pinch';
import LoginAuth from './components/Login/LoginAuth.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

// const App = () => {

//   const [title, setTitle] = useState(true);
//   return (
//     <div className='appBackground'>
//       <div className='app'>
//         <GalaxyWindow setTitle={setTitle} className='galaxyWindow' />
//       </div>
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
          <Route
            exact path="/"
            element={<LoginAuth setTitle={setTitle}/>}
          />
          <Route
            exact path="/entergalaxy/userid/:id"
            element = {<EnterGalaxy setTitle={setTitle}/>}
          />
          <Route
            exact path="/creategalaxy/userid/:id"
            element={<CreateGalaxy setTitle={setTitle}/>}
          />
          <Route
            exact path = "/galaxy/userid/:id"
            element={<GalaxyWindow setTitle={setTitle}/>}
          />
          <Route
            exact path = "/tasks/userid/:id"
            element={<TaskTracker setTitle={setTitle}/>}
          />
        </Routes>
      </div>
      {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
      {/* <CreateGalaxy /> */}
      {/* <Title /> */}
      {/* <Menu /> */}
    </HashRouter>
  );
};

export default App;
