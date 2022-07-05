import * as React from 'react';

interface Props {}
const PlayIcon: React.FC<Props> = ({}) => {
  return (
    <svg
      style={{ transform: 'scale(.7)', fill: 'white' }}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
    >
      <path d="M16 37.85v-28l22 14Zm3-14Zm0 8.55 13.45-8.55L19 15.3Z" />
    </svg>
  );
};

export default PlayIcon;
