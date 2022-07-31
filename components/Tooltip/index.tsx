import React, { useState } from 'react';

export interface Props extends React.PropsWithChildren {
  delay?: number;
  direction?: string;
  content: React.ReactElement | string;
}
const Index: React.FC<Props> = ({ delay, children, direction, content }) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    if (content) {
      timeout = setTimeout(() => {
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
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || 'top'}`}>{content}</div>
      )}
    </div>
  );
};

export default Index;
