import * as React from 'react';

interface Props {
  fill?: string;
}
const PlayIcon: React.FC<Props> = ({ fill = '#fff' }) => {
  return (
    <svg
      style={{ fill }}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
    >
      <path d="M16 37.85v-28l22 14Zm3-14Zm0 8.55 13.45-8.55L19 15.3Z" />
    </svg>
  );
};

export default PlayIcon;
