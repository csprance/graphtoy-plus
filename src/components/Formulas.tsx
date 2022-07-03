import * as React from 'react';
import { useStore } from '../store';
import FormulaComponent from './Formula';

interface Props {}
const Formulas: React.FC<Props> = ({}) => {
  const {
    formulas,
    clearFormulas,
    setExampleFormulas1,
    setExampleFormulas2,
    setExampleFormulas3,
    createLink,
  } = useStore();

  return (
    <div className="guiWindow">
      <div id="formulaButtonBar">
        <div
          className="userInputButtonsSmall"
          style={{ marginRight: 'auto' }}
          onClick={createLink}
        >
          <span className="ms">Link</span>
          <span
            className="ml"
            title="Create an URL Link that you can share (already in clipboard) )"
          >
            Create Link for Sharing
          </span>
        </div>
        <div
          className="userInputButtonsSmall"
          style={{ marginRight: 12 }}
          onClick={clearFormulas}
        >
          Clear
        </div>
        <div
          className="userInputButtonsSmall"
          style={{ marginRight: 12 }}
          onClick={setExampleFormulas1}
        >
          <span className="ms">Ex 1</span>
          <span className="ml">Example 1</span>
        </div>
        <div
          className="userInputButtonsSmall"
          style={{ marginRight: 12 }}
          onClick={setExampleFormulas2}
        >
          <span className="ms">Ex 2</span>
          <span className="ml">Example 2</span>
        </div>
        <div className="userInputButtonsSmall" onClick={setExampleFormulas3}>
          <span className="ms">Ex 2</span>
          <span className="ml">Example 3</span>
        </div>
      </div>
      {formulas.map((formula) => (
        <FormulaComponent key={formula.index} formula={formula} />
      ))}
    </div>
  );
};

export default Formulas;
