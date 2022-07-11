import * as React from 'react';
import styled from 'styled-components';

import { Formula } from '../lib/graphtoy/types';
import { useStore } from '../store';
import VisualizerOptions from './VisualizerOptions';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80px auto 150px;
  padding-bottom: 4px;
`;

interface Props {
  formula: Formula;
}
const FormulaComponent: React.FC<Props> = ({
  formula: { id, value, visualizer, enabled },
}) => {
  const [r, g, b] = visualizer;
  const { setFormulaValue, formulaColors, toggleFormulaVisibility } =
    useStore();

  return (
    <Wrapper>
      <div
        id={`f${id}`}
        onClick={() => {
          toggleFormulaVisibility(id);
        }}
        style={{
          cursor: 'pointer',
          color: enabled ? formulaColors[id] : '#808080',
        }}
      >
        f<sub>{id}</sub>(x,t) = &nbsp;
      </div>
      <div style={{ width: '100%' }}>
        <input
          type="text"
          autoCorrect="off"
          autoCapitalize="none"
          className="userInput"
          style={{ width: '100%', borderColor: 'transparent' }}
          name={`formula${id}`}
          id={`formula${id}`}
          value={value}
          onChange={(e) => {
            setFormulaValue(id - 1, e.target.value);
          }}
        />
      </div>
      <VisualizerOptions id={id} r={r} g={g} b={b} />
    </Wrapper>
  );
};

export default FormulaComponent;
