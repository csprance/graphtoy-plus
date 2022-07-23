import * as React from 'react';
import styled from 'styled-components';

import { Formula } from '../lib/graphtoy/types';
import { useStore } from '../store';
import VisualizerOptions from './VisualizerOptions';
import { ctrlColor } from '../styles';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80px auto 150px;
  padding-bottom: 4px;
`;
const FormulaInputField = styled.input<{ error: boolean }>`
  width: 100%;
  border-color: ${({ error }) => (error ? 'red' : 'transparent')};
  :focus {
    outline: ${ctrlColor} solid 2px;
  }
`;
interface Props {
  formula: Formula;
}
const FormulaComponent: React.FC<Props> = ({
  formula: { id, value, visualizer, enabled },
}) => {
  const [error, setError] = React.useState('');
  const [r, g, b] = visualizer;
  const {
    setFormulaValue,
    formulaColors,
    toggleFormulaVisibility,
    grapher,
  } = useStore();
  // Handle our Errors here
  React.useEffect(() => {
    grapher.events.on('formulaError', (err) => {
      if (err.formula.id === id) {
          if(err.error.startsWith('Unexpected token ')){
              setError('Failed to parse expression.');
          } else {
              setError(err.error);
          }

      }
    });
    grapher.events.on('formulaCompiled', (_id) => {
      if (_id === id) {
        setError('');
      }
    });
  }, [grapher, id]);

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
        <FormulaInputField
          error={!!error}
          type="text"
          autoCorrect="off"
          spellCheck={false}
          autoCapitalize="none"
          className="userInput"
          name={`formula${id}`}
          id={`formula${id}`}
          value={value}
          onChange={(e) => setFormulaValue(id, e.target.value)}
        />
        {error}
      </div>
      <VisualizerOptions id={id} r={r} g={g} b={b} />
    </Wrapper>
  );
};

export default FormulaComponent;
