import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';

function App() {

  document.title = 'mindtech - PokéAPI'

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="pt-12 w-full h-full">
        <Main />
      </div>
    </div>
  );
}

export default App;
