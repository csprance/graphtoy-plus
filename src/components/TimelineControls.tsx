import * as React from 'react';

import { useStore } from '../store';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';
import ResetIcon from './ResetIcon';

interface Props {}
const TimelineControls: React.FC<Props> = () => {
  const { grapher } = useStore();
  const [paused, setPaused] = React.useState(false);
  return (
    <>
      <div
        className="userInputButtonsMedium"
        style={{ marginRight: 12 }}
        onClick={() => grapher.resetTime()}
      >
        <ResetIcon />
      </div>

      <div
        className="userInputButtonsMedium"
        onClick={() => {
          setPaused(!paused);
          grapher.togglePlay();
        }}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </div>
    </>
  );
};

export default TimelineControls;
