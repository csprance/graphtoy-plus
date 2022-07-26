import * as React from 'react';

import { clamp } from '../lib/graphtoy/lib';
import { OnPlayPauseFn, OnTimeUpdateFn } from '../lib/graphtoy/types';
import { useStore } from '../store';
import RangeSlider from './RangeSlider';

interface Props {}
const TimelineBar: React.FC<Props> = () => {
  const { grapher } = useStore();
  const [t, setT] = React.useState( 0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const timeHandle: OnTimeUpdateFn = (t) => {
      setT(t);
    };
    const pauseHandle: OnPlayPauseFn = (p) => {
      setPaused(p);
    };
    grapher.events.on('playPause', pauseHandle);
    grapher.events.on('time', timeHandle);
    return () => {
      grapher.events.off('playPause', pauseHandle);
      grapher.events.off('time', timeHandle);
    };
  }, [grapher]);

  return (
    <RangeSlider
      name={'timeline-range-slider'}
      disabled={!paused}
      min={0}
      max={clamp(t + 150, 0, 1500)}
      value={t}
      step={0.1}
      id="a"
      onChange={(e) => {
        setT(Number(e.target.value));
        grapher.resetTime(Number(e.target.value));
      }}
    />
  );
};

export default TimelineBar;
