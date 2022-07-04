import * as React from 'react';
import { useStore, Variable } from '../store';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px 50px;
  align-items: center;
  //justify-content: center;
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
          setVariable(id, { value: Number(e.target.value) });
        }}
      />

      <input
          style={{height: 20, marginLeft: 5, marginRight: 5}}
        type="text"
        value={min}
        onChange={(e) => {
          setVariable(id, { min: Number(e.target.value) });
        }}
      />

      <input
          style={{height: 20,  marginLeft: 5,marginRight: 5}}
        type="text"
        value={max}
        onChange={(e) => {
          setVariable(id, { max: Number(e.target.value) });
        }}
      />
    </Wrapper>
  );
};

export default VariableComponent;
