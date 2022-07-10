import * as React from 'react';

import { useStore } from '../store';

interface Props {}
const Coords: React.FC<Props> = () => {
  const { grapher } = useStore();
  const coordRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (coordRef.current) {
      grapher.registerCoordListener((x, y) => {
        coordRef.current!.innerText = `${x.toFixed(2)}, ${y.toFixed(2)}`;
      });
    }
  }, [grapher]);
  return (
    <div ref={coordRef} style={{ marginRight: 'auto' }}>
      0, 0
    </div>
  );
};

export default Coords;
