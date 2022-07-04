import * as React from 'react';
import { ChangeEvent } from 'react';
import { useStore, Variable } from '../store';
import styled from 'styled-components';
import { isNumber } from '../lib/utils';
import RangeSlider from "./RangeSlider";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 35px 80px auto 70px 70px;
  align-items: center;margin-bottom: 5px;
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
  const setVariableOnChange = (key: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (isNumber(e.target.value)) {
      setVariable(id, { [key]: e.target.value });
    }
  };
  return (
    <Wrapper>
      <div style={{textAlign: 'center'}}>{name}</div>

      <input
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={value === Number.EPSILON ? 0 : value}
        onChange={setVariableOnChange('value')}
      />

      <RangeSlider
        min={min}
        max={max}
        value={value}
        step={step}
        id="a"
        onChange={setVariableOnChange('value')}
      />

      <input
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={min}
        onChange={setVariableOnChange('min')}
      />

      <input
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={max}
        onChange={setVariableOnChange('max')}
      />
    </Wrapper>
  );
};

export default VariableComponent;
