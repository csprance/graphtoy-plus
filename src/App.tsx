import React from 'react';

import Graph from './components/Graph';
import Gui from './components/Gui';
import Header from './components/Header';
import { useStore } from './store';

function App() {
  const { parseUrlFormulas } = useStore();
  React.useEffect(() => {
    parseUrlFormulas();
  }, [parseUrlFormulas]);
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
