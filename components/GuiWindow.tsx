import * as React from 'react';

interface Props extends React.PropsWithChildren {}
const GuiWindow: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default GuiWindow;
