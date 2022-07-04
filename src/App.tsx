import React from 'react';
import Header from './components/Header';
import Graph from './components/Graph';
import Gui from './components/Gui';

function App() {
  return (
    <>
      <Header />
      <div className="parts">
        <div className="part">
          <Graph />
        </div>
        <div className="part">
          <Gui />
        </div>
      </div>
    </>
  );
}

export default App;
