import * as React from 'react';

import Grapher from '../lib/graphtoy';
import { useStore } from '../store';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';
import ResetIcon from './ResetIcon';

interface Props {}
const Graph: React.FC<Props> = ({}) => {
  const { setGrapher, parseUrlFormulas } = useStore();

  const [paused, setPaused] = React.useState(false);
  const [theme, setTheme] = React.useState('Dark');
  const [range, setRange] = React.useState('Free');
  const [grid, setGrid] = React.useState('Grid Dec');

  const grapherToggleVisualizer = () => {
    grapherRef.current?.toggleVisualizer();
  };
  const grapherToggleTheme = () => {
    grapherRef.current?.toggleTheme();
  };
  const grapherToggleShowAxes = () => {
    if (grapherRef.current?.mShowAxes === 0) setGrid('Grid Off');
    else if (grapherRef.current?.mShowAxes === 1) setGrid('Grid Dec');
    else if (grapherRef.current?.mShowAxes === 2) setGrid('Grid Bin');
    grapherRef.current?.toggleShowAxes();
  };
  const grapherToggleRange = () => {
    grapherRef.current?.toggleRange();
  };
  const grapherResetTime = () => {
    grapherRef.current?.resetTime();
  };

  const grapherRef = React.useRef<Grapher | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!grapherRef.current && canvasRef.current) {
      console.log('Starting Grapher');
      const grapher = new Grapher(useStore);
      // Set the canvas so it knows where to operate
      grapher.setCanvas(canvasRef.current);
      // Add Grapher to our store to use anywhere
      setGrapher(grapher);
      // Add it to our ref
      grapherRef.current = grapher;
      // Start grapher and register all the event handles/state
      grapher.start();

      useStore.subscribe((state, previousState) => {
        // If our variables our different rerender all
        if (state.variables !== previousState.variables) {
          grapher.newFormula(1);
          if (grapher.mPaused) {
            grapher.draw();
          }
        }
        for (let i = 0; i < state.formulas.length; i++) {
          if (state.formulas[i].value !== previousState.formulas[i].value) {
            grapher.newFormula(i + 1);
            if (grapher.mPaused) {
              grapher.draw();
            }
          }
        }
      });

      parseUrlFormulas();
    }
  }, [setGrapher, parseUrlFormulas]);

  return (
    <div
      className="guiWindow"
      title="Pan: Left Mouse Button
Zoom: Mouse Wheel, or Shift+Left Mouse Button"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingBottom: 8,
        }}
      >
        <div
          id="myTheme"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={grapherToggleVisualizer}
          title="Toggle Visualizer"
        >
          Visualizer
        </div>
        <div
          id="myTheme"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={grapherToggleTheme}
          title="Set Color Scheme"
        >
          {theme}
        </div>
        <div
          id="myAxes"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={grapherToggleShowAxes}
          title="Show/Hide Grid"
        >
          {grid}
        </div>
        <div
          id="myRange"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={grapherToggleRange}
          title="Choose navigation mode"
        >
          {range}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        id="mainCanvas"
        style={{ width: '100%', height: 'auto' }}
        width={1664}
        height={1248}
      />
      <div id="formulaParamBar">
        <div id="myCoords" style={{ marginRight: 'auto' }}>
          (0, 0)
        </div>
        <div id="myTime" style={{ width: 102 }}>
          t = 0.0
        </div>
        <div
          className="userInputButtonsMedium"
          style={{ marginRight: 12 }}
          onClick={grapherResetTime}
        >
          <ResetIcon />
        </div>
        <div
          className="userInputButtonsMedium"
          onClick={() => {
            setPaused(!paused);
            grapherRef.current!.togglePlay();
          }}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </div>
      </div>
    </div>
  );
};

export default Graph;
