import * as React from 'react';

interface Props {
  fill?: string;
}
const ResetIcon: React.FC<Props> = ({ fill = '#fff' }) => {
  return (
    <svg
      style={{ fill }}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
    >
      <path d="M12 36V12h3v24Zm22.35-.15-11.7-11.7 11.7-11.7 2.15 2.15-9.55 9.55 9.55 9.55Z" />
    </svg>
  );
};

export default ResetIcon;
