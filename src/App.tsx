import React from 'react';

import Graph from './components/Graph';
import Gui from './components/Gui';
import Header from './components/Header';
import { useStore } from './store';
import { GlobalStyles, PrismA11lyTheme } from './styles';

function App() {
  const { parseUrlFormulas } = useStore();
  React.useEffect(() => {
    parseUrlFormulas();
  }, [parseUrlFormulas]);
  return (
    <>
      <GlobalStyles />
      <PrismA11lyTheme />
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
