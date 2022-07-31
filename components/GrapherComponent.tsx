import * as React from 'react';

import Grapher from '../lib/graphtoy';
import { Formula, Variable } from '../lib/graphtoy/types';

interface Props {
  grapher: Grapher;
  formulas: Formula[];
  variables: Variable[];
  extraInit?: (grapher: Grapher) => void;
}
const GrapherComponent: React.FC<Props> = ({
  grapher,
  formulas,
  variables,
  extraInit,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Update Canvas
  React.useEffect(() => {
    if (canvasRef.current) {
      // Set the canvas so it knows where to operate
      grapher.setCanvas(canvasRef.current);
      // Do any extra setup you want here
      if (extraInit) extraInit(grapher);
      // Start grapher and register all the event handles/state
      grapher.start();
    }
  }, [grapher, canvasRef, extraInit]);

  // Update Formulas
  React.useEffect(() => {
    grapher.setFormulas(formulas, true);
  }, [formulas, grapher]);

  // Update Variables
  React.useEffect(() => {
    grapher.setVariables(variables, true);
  }, [variables, grapher]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 'auto' }}
      width={1664}
      height={1248}
    />
  );
};

export default GrapherComponent;
