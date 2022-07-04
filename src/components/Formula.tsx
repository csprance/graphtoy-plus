import * as React from 'react';
import { useStore, Formula } from '../store';
import styled from 'styled-components';
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
const FormulaComponent: React.FC<Props> = ({ formula }) => {
  const [enabled, setEnabled] = React.useState(true);
  const { setFormulaValue, formulaColors, grapher } = useStore();

  return (
    <Wrapper>
      <div
        id={`f${formula.index}`}
        onClick={() => {
          setEnabled(!enabled);
          grapher?.toggleVisibility(formula.index);
        }}
        style={{
          cursor: 'pointer',
          color: enabled ? formulaColors[formula.index - 1] : '#808080',
        }}
      >
        f<sub>{formula.index}</sub>(x,t) = &nbsp;
      </div>
      <div style={{ width: '100%' }}>
        <input
          type="text"
          autoCorrect="off"
          autoCapitalize="none"
          className="userInput"
          style={{ width: '100%', borderColor: 'transparent' }}
          name={`formula${formula.index}`}
          id={`formula${formula.index}`}
          value={formula.value}
          onChange={(e) => {
            setFormulaValue(formula.index - 1, e.target.value);
          }}
        />
      </div>
      <VisualizerOptions r g b />
    </Wrapper>
  );
};

export default FormulaComponent;
