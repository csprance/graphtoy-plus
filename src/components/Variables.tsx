import * as React from 'react';
import { useStore } from '../store';
import VariableComponent from './VariableComponent';

interface Props {}
const Variables: React.FC<Props> = ({}) => {
  const { variables } = useStore();

  return (
    <div className="guiWindow">
      {variables.map((myVar) => (
        <VariableComponent key={myVar.id} {...myVar} />
      ))}
    </div>
  );
};

export default Variables;
