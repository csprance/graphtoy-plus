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
      <Formulas />
      <Variables />
      <Notes />
      <FunctionButtons />
      <Help />
    </>
  );
};

export default Gui;
