import React from 'react';

import Graph from './components/Graph';
import Gui from './components/Gui';
import Header from './components/Header';

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
