import * as React from 'react';

import Formulas from './Formulas';
import FunctionButtons from './FunctionButtons';
import Help from './Help';
import Notes from './Notes';
import Variables from './Variables';

interface Props {}
const Gui: React.FC<Props> = () => {
  return (
    <>
      <Variables />
      <br />
      <Formulas />
      <br />
      <Notes />
      <br />
      <FunctionButtons />
      <br />
      <Help />
    </>
  );
};

export default Gui;
