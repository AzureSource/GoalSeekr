import React from 'react';
import { signInWithGoogle } from './firebase.js';
import Counter from './components/actionsToolbar/attackModal/Counter';
import '../assets/login.css';

const App = () => {
  return (
    <div>
      <div className='app'>
        <div>
          <button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>
        </div>
      </div>
      <Counter />
    </div>
  );
};

export default App;