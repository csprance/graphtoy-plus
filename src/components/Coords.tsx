import * as React from 'react';

import { OnCoordUpdateFn } from '../lib/graphtoy/types';
import { useStore } from '../store';

interface Props {}
const Coords: React.FC<Props> = () => {
  const { grapher } = useStore();
  const coordRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (coordRef.current) {
      const handler: OnCoordUpdateFn = ([x, y]) => {
        coordRef.current!.innerText = `${x.toFixed(2)}, ${y.toFixed(2)}`;
      };
      grapher.events.on('coords', handler);
      return () => {
        grapher.events.off('coords', handler);
      };
    }
  }, [grapher]);

  return (
    <div style={{ textAlign: 'left' }} ref={coordRef}>
      0, 0
    </div>
  );
};

export default Coords;
