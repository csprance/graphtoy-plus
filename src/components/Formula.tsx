import { highlight, languages } from 'prismjs';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
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
const FormulaInputField = styled(Editor)<{ error: boolean }>`
  width: 100%;
  border: ${({ error }) => (error ? 'red' : 'transparent')} 2px solid;
`;
interface Props {
  formula: Formula;
}
const FormulaComponent: React.FC<Props> = ({
  formula: { id, value, visualizer, enabled },
}) => {
  const [error, setError] = React.useState('');
  const [r, g, b] = visualizer;
  const { setFormulaValue, formulaColors, toggleFormulaVisibility, grapher } =
    useStore();
  // Handle our Errors here
  React.useEffect(() => {
    grapher.events.on('formulaError', (err) => {
      if (err.formula.id === id) {
        if (err.error.startsWith('Unexpected token ')) {
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
          value={value}
          error={!!error}
          onValueChange={(code) => setFormulaValue(id, code)}
          highlight={(code) => highlight(code, languages.js, 'javascript')}
          padding={10}
          className="userInput"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        {error}
      </div>
      <VisualizerOptions id={id} r={r} g={g} b={b} />
    </Wrapper>
  );
};

export default FormulaComponent;
