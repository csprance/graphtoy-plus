import * as React from 'react';

import { useStore } from '../store';
import GrapherComponent from './GrapherComponent';
import TimelineControls from './TimelineControls';

interface Props {}
const Graph: React.FC<Props> = () => {
  const { grapher, formulas, variables } = useStore();

  const [theme, setTheme] = React.useState('Dark');
  const [range, setRange] = React.useState('Free');
  const [grid, setGrid] = React.useState('Grid Dec');

  const grapherToggleVisualizer = () => {
    grapher.toggleVisualizer();
  };
  const grapherToggleTheme = () => {
    grapher.toggleTheme();
    if (grapher.mTheme === 0) setTheme('Dark');
    if (grapher.mTheme === 1) setTheme('Light');
  };
  const grapherToggleShowAxes = () => {
    grapher.toggleShowAxes();
    if (grapher.mShowAxes === 0) setGrid('Grid Off');
    if (grapher.mShowAxes === 1) setGrid('Grid Dec');
    if (grapher.mShowAxes === 2) setGrid('Grid Bin');
  };

  const grapherToggleRange = () => {
    grapher.toggleRange();
    if (grapher.mRangeType === 0) setRange('0..1');
    if (grapher.mRangeType === 1) setRange('-1..1');
    if (grapher.mRangeType === 2) setRange('Free');
  };

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

      <GrapherComponent
        formulas={formulas}
        variables={variables}
        grapher={grapher}
      />

      <TimelineControls />
    </div>
  );
};

export default Graph;
