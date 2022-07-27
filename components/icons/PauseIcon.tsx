import * as React from 'react';

interface Props {
  fill?: string;
}
const PauseIcon: React.FC<Props> = ({ fill = '#fff' }) => {
  return (
    <svg
      style={{ fill }}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
    >
      <path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z" />
    </svg>
  );
};

export default PauseIcon;
