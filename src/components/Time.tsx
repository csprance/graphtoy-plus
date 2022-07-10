import * as React from 'react';

import { useStore } from '../store';

interface Props {}
const Time: React.FC<Props> = () => {
  const { grapher } = useStore();
  const timeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (timeRef.current) {
      grapher.registerTimeListener((x) => {
        timeRef.current!.innerText = `t = ${x.toFixed(2)}`;
      });
    }
  }, [grapher]);

  return (
    <div ref={timeRef} style={{ width: 102 }}>
      t = 0.0
    </div>
  );
};

export default Time;
