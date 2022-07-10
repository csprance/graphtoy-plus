import * as React from 'react';

interface Props {}
const ResetIcon: React.FC<Props> = () => {
  return (
    <svg
      style={{ transform: 'scale(.7)', fill: 'white' }}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
    >
      <path d="M12 36V12h3v24Zm22.35-.15-11.7-11.7 11.7-11.7 2.15 2.15-9.55 9.55 9.55 9.55Z" />
    </svg>
  );
};

export default ResetIcon;
