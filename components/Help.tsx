import * as React from 'react';

import GuiWindow from './GuiWindow';

interface Props {}
const Help: React.FC<Props> = () => {
  return (
    <GuiWindow>
      <ul>
        <li>Use Mouse to pan view</li>
        <li>Use SHIFT+Mouse to zoom centered at the mouse pointer</li>
        <li>Use Mouse Wheel to zoom on current viewport center</li>
        <li>
          Use the Variables section to control the variable values (A, B, C, D,
          E, F, G, H) and their min/max values
        </li>
        <li>
          Click the checkboxes to the right of the formula to toggle that
          formula in the visualizer window.
        </li>
        <li>
          The Visualizer window will show anything graphed in the [0,1] along
          the X axis.
        </li>
      </ul>
    </GuiWindow>
  );
};

export default Help;
