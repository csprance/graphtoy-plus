import * as React from 'react';
import { useStore, Formula } from '../store';


interface Props {
  formula: Formula;
}
const FormulaComponent: React.FC<Props> = ({ formula }) => {
  const {
    setFocusedFormula,
    toggleFormulaVisibility,
    setFormulaValue,
    formulaColors,
  } = useStore();

  return (
    <div className="formulaSection">
      <div
        id={`f${formula.index}`}
        onClick={() => toggleFormulaVisibility(formula.index)}
        style={{
          color: formula.enabled ? formulaColors[formula.index - 1] : '#808080',
        }}
      >
        f<sub>{formula.index}</sub>(x,t) = &nbsp;
      </div>
      <input
        type="text"
        onFocus={() => {
          setFocusedFormula(formula.index);
        }}
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
