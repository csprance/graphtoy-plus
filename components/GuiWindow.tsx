import * as React from 'react';
import styled from 'styled-components';

import { guiBgColor } from '../styles';

const Wrapper = styled.div`
  background-color: ${guiBgColor};
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 10px;
`;
interface Props extends React.PropsWithChildren {}
const GuiWindow: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default GuiWindow;
