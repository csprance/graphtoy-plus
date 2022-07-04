import * as React from 'react';
import Grapher from '../lib/graphtoy';
import { useStore } from '../store';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';
import ResetIcon from './ResetIcon';

interface Props {}
const Graph: React.FC<Props> = ({}) => {
  const [paused, setPaused] = React.useState(false);
  const {
    setTime,
    toggleTheme,
    toggleGridType,
    toggleRange,
    setGrapher,
  } = useStore();

  const grapherRef = React.useRef<Grapher | null>(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!grapherRef.current) {
      console.log('Using effect');
      const grapher = new Grapher(useStore);
      setGrapher(grapher);
      grapherRef.current = grapher;
      grapher.setCanvas(canvasRef.current);
      grapher.start();
      useStore.subscribe((state, previousState) => {
        // for (let i = 0; i < state.formulas.length; i++) {
        if (state.variables !== previousState.variables) {
          grapher.newFormula(1);
          // Compile our formulas
        }
        // }
        for (let i = 0; i < state.formulas.length; i++) {
          if (state.formulas[i].value !== previousState.formulas[i].value) {
            grapher.newFormula(i + 1);
            // Compile our formulas
          }
        }

        // TODO: Add in the new formulas when the old change
      });
      // const args = decodeURIComponent(
      //   window.location.href.slice(window.location.href.indexOf('?') + 1)
      // ).split('&');
      // grapher.parseUrlFormulas(args);
    }
  }, [setGrapher]);

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
          onClick={toggleTheme}
          title="Set Color Scheme"
        >
          Dark
        </div>
        <div
          id="myAxes"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={toggleGridType}
          title="Show/Hide Grid"
        >
          Grid Dec
        </div>
        <div
          id="myRange"
          className="userInputButtonsBig"
          style={{ marginRight: 12 }}
          onClick={toggleRange}
          title="Choose navigation mode"
        >
          Free
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
          onClick={() => setTime(0)}
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
