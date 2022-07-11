import * as React from 'react';

import { useStore } from '../store';

interface Props {}
const Time: React.FC<Props> = () => {
  const { grapher } = useStore();
  const timeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (timeRef.current) {
      const handler = (t: number) => {
        timeRef.current!.innerText = `t = ${t.toFixed(2)}`;
      };
      grapher.events.on('time', handler);
      return () => {
        grapher.events.off('time', handler);
      };
    }
  }, [grapher]);

  return (
    <div ref={timeRef} style={{ textAlign: 'center' }}>
      t = 0.0
    </div>
  );
};

export default Time;
