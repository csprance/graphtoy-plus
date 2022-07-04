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
const FormulaComponent: React.FC<Props> = ({
  formula: { id, value, visualizer, enabled },
}) => {
  const [_enabled, setEnabled] = React.useState(true);
  const { setFormulaValue, formulaColors, grapher } = useStore();

  return (
    <Wrapper>
      <div
        id={`f${id}`}
        onClick={() => {
          setEnabled(!enabled);
          grapher?.toggleVisibility(id);
        }}
        style={{
          cursor: 'pointer',
          color: _enabled ? formulaColors[id - 1] : '#808080',
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
      <VisualizerOptions setVisualizers={() => undefined} r g b />
    </Wrapper>
  );
};

export default FormulaComponent;
