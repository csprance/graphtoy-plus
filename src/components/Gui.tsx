import * as React from 'react';

import Formulas from './Formulas';
import FunctionButtons from './FunctionButtons';
import Variables from './Variables';
import Notes from './Notes';

interface Props {}
const Gui: React.FC<Props> = () => {
  return (
    <>
      {/*Variable Window */}
      <Variables />
      <br />
      {/* Formula Window */}
      <Formulas />
      <br />
      {/* Function Buttons */}
      <FunctionButtons />
      <br />
      {/* Help Window */}
      <div className="guiWindow">
        <ul>
          <li>Use Mouse to pan view</li>
          <li>Use SHIFT+Mouse to zoom centered at the mouse pointer</li>
          <li>Use Mouse Wheel to zoom on current viewport center</li>
        </ul>
      </div>
      {/*<Notes />*/}
    </>
  );
};

export default Gui;
