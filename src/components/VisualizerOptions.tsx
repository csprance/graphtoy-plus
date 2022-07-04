import * as React from 'react';
import styled from 'styled-components';
import { blue, green, red } from '../styles';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
  width: 100%;
`;
const MyCheckbox = styled.input`
  appearance: none;
  /* create custom checkbox appearance */
  display: inline-block;
  width: 15px;
  height: 15px;
  /* background-color only for content */
  background-clip: content-box;
  background-color: #e7e6e7;
  cursor: pointer;
  &:checked {
    background-color: ${({ color }) => color};
  }

  &:focus {
    outline: none !important;
  }
`;

interface Props {
  r: boolean;
  g: boolean;
  b: boolean;
}
const VisualizerOptions: React.FC<Props> = ({ r, g, b }) => {
    const toggleOthersContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
    }
  return (
    <Wrapper>

      <MyCheckbox
        checked={r}
        onContextMenu={toggleOthersContextMenu}
        color={red}
        type="checkbox"
      />

      <MyCheckbox
        checked={g}
        onContextMenu={toggleOthersContextMenu}
        color={green}
        type="checkbox"
      />

      <MyCheckbox
        checked={b}
        onContextMenu={toggleOthersContextMenu}
        color={blue}
        type="checkbox"
      />

    </Wrapper>
  );
};

export default VisualizerOptions;
