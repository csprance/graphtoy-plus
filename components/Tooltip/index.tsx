import React, { useRef, useState } from "react";
import { set } from "immer/dist/utils/common";

export interface Props extends React.PropsWithChildren {
  delay?: number;
  direction?: string;
  content: React.ReactElement | string;
}
const Index: React.FC<Props> = ({ delay, children, direction, content }) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(320);
  const [side, setSide] = useState(direction ? direction : 'right');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTip = () => {
    if (content) {
      timeout = setTimeout(() => {
        const offsetAmtLeft = document.body.clientWidth -tooltipRef.current!.offsetLeft;
        const offsetAmtRight = tooltipRef.current!.offsetLeft;
        console.log('left', offsetAmtLeft);
        console.log('right', offsetAmtRight);
        if ( offsetAmtLeft < 320) {
          setSide('left');
        } else {
          setSide('right')
        }

        // } else if (offsetAmtRight > 320){
        //   setSide('top');
        // }
        if (  offsetAmtRight> 320){
          setSide('right');
        }
        setActive(true);
      }, delay || 250);
    }
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      ref={tooltipRef}
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          style={{  maxWidth: '320px' }}
          className={`Tooltip-Tip ${side || 'top'}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Index;
