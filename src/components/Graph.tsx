import * as React from 'react';
import Grapher from '../lib/graphtoy';
import { useStore } from '../store';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';
import ResetIcon from './ResetIcon';

interface Props {}
const Graph: React.FC<Props> = ({}) => {
  const {
    paused,
    setTime,
    togglePlay,
    toggleTheme,
    toggleGridType,
    toggleRange,
    setGrapher,
  } = useStore();
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const grapher = new Grapher(useStore);
    setGrapher(grapher);
    grapher.setCanvas(canvasRef.current);
    grapher.start();
    useStore.subscribe((state, previousState) => {
      // If the state says the grapher should be paused and it's not paused pause it
      if (state.paused && !grapher.mPaused) {
        grapher.togglePlay();
      }
      // If the state says the grapher should not be paused and grapher says it's paused unpause it
      if (!state.paused && grapher.mPaused) {
        grapher.togglePlay();
      }
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
  }, []);

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
        <div className="userInputButtonsMedium" onClick={togglePlay}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </div>
      </div>
    </div>
  );
};

export default Graph;
