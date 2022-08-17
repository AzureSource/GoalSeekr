import React, { useState } from 'react';
import TitleBar from './components/Lobby/TitleBar.jsx';
import '../assets/login.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import EnterGalaxy from './components/Login/EnterGalaxy.jsx';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';'react-zoom-pan-pinch';
import LoginAuth from './components/Login/LoginAuth.jsx';

const App = () => {

  const [title, setTitle] = useState(true);
  return (
    <div className='appBackground'>
      <div className='app'>
        <GalaxyWindow setTitle={setTitle} className='galaxyWindow' />
      </div>
    </div>
  );
};

// const App = () => {
//   const [title, setTitle] = useState(true);

//   return (
//     <HashRouter>
//       <div className='appBackground'>
//         {title ? <TitleBar/> : null}
//         <Routes>
//           <Route
//             exact path="/"
//             element={<LoginAuth setTitle={setTitle}/>}
//           />
//           <Route
//             exact path="/entergalaxy/uid/:id"
//             element = {<EnterGalaxy setTitle={setTitle}/>}
//           />
//           <Route
//             exact path="/creategalaxy/uid/:id"
//             element={<CreateGalaxy setTitle={setTitle}/>}
//           />
//           <Route
//             exact path = "/galaxy/uid/:id"
//             element={<GalaxyWindow setTitle={setTitle}/>}
//           />
//         </Routes>
//       </div>
//     </HashRouter>
//   );
// };

export default App;
