import * as React from 'react';
import { useStore, Formula } from '../store';


interface Props {
  formula: Formula;
}
const FormulaComponent: React.FC<Props> = ({ formula }) => {
    const [enabled, setEnabled] = React.useState(true);
  const {
    setFormulaValue,
    formulaColors,
      grapher
  } = useStore();

  return (
    <div className="formulaSection">
      <div
        id={`f${formula.index}`}
        onClick={() => {
            setEnabled(!enabled)
            grapher?.toggleVisibility(formula.index)
        }}
        style={{
          color: enabled ? formulaColors[formula.index - 1] : '#808080',
        }}
      >
        f<sub>{formula.index}</sub>(x,t) = &nbsp;
      </div>
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
  );
};

export default FormulaComponent;
