import * as React from 'react';

import { MyMath } from '../lib/graphtoy/lib';
import { useStore } from '../store';
import RangeSlider from './RangeSlider';

interface Props {}
const TimelineBar: React.FC<Props> = () => {
  const { grapher } = useStore();
  const [t, setT] = React.useState(grapher.mTimeS);
  React.useEffect(() => {
    const handler = (t: number) => {
      setT(t);
    };
    grapher.events.on('time', handler);
    return () => {
      grapher.events.off('time', handler);
    };
  }, [grapher]);

  return (
    <RangeSlider
      min={0}
      max={MyMath.clamp(t + 150, 0, 1500)}
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
