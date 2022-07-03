import * as React from 'react';
import {useStore, Variable} from '../store';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
`;

interface Props extends Variable {}
const VariableComponent: React.FC<Props> = ({
  min,
  max,
  value,
  step,
  id,
  name,
}) => {
  const { setVariable } = useStore();
  return (
    <Wrapper className="slidecontainer">
      <p>{name}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className="slider"
        id="a"
        onChange={(e) => {
          setVariable(id, Number(e.target.value));
        }}
      />
    </Wrapper>
  );
};

export default VariableComponent;
