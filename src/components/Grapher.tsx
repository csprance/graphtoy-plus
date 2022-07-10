import * as React from 'react';

import { useStore } from '../store';

interface Props {}
const Grapher: React.FC<Props> = () => {
  const { grapher, formulas, variables } = useStore();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Update Canvas
  React.useEffect(() => {
    if (canvasRef.current) {
      // Set the canvas so it knows where to operate
      grapher.setCanvas(canvasRef.current);
      // Start grapher and register all the event handles/state
      grapher.start();
    }
  }, [grapher, canvasRef]);

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
      id="mainCanvas"
      style={{ width: '100%', height: 'auto' }}
      width={1664}
      height={1248}
    />
  );
};

export default Grapher;
