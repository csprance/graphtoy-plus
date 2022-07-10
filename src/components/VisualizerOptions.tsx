import * as React from 'react';
import styled from 'styled-components';

import { useStore } from '../store';
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
  id: number;
}
const VisualizerOptions: React.FC<Props> = ({ r, g, b, id }) => {
  const { setVisualizers } = useStore();
  const toggleOthersContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVisualizers(id, [true, true, true]);
  };
  return (
    <Wrapper>
      <MyCheckbox
        checked={r}
        onChange={(e) => setVisualizers(id, [e.target.checked, g, b])}
        onContextMenu={toggleOthersContextMenu}
        color={red}
        type="checkbox"
      />

      <MyCheckbox
        checked={g}
        onChange={(e) => setVisualizers(id, [r, e.target.checked, b])}
        onContextMenu={toggleOthersContextMenu}
        color={green}
        type="checkbox"
      />

      <MyCheckbox
        checked={b}
        onChange={(e) => setVisualizers(id, [r, g, e.target.checked])}
        onContextMenu={toggleOthersContextMenu}
        color={blue}
        type="checkbox"
      />
    </Wrapper>
  );
};

export default VisualizerOptions;
