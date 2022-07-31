import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { Variable } from '../lib/graphtoy/types';
import { isNumber } from '../lib/utils';
import { useStore } from '../store';
import RangeSlider from './RangeSlider';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 35px 80px auto 70px 70px 70px;
  align-items: center;
  margin-bottom: 5px;
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
  const setVariableOnChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (isNumber(e.target.value)) {
        setVariable(id, { [key]: e.target.value });
      }
    };
  return (
    <Wrapper>
      <div style={{ textAlign: 'center' }}>{name}</div>

      <label className={'sr-only'} htmlFor={`value-input-for-variable-${name}`}>
        Value input for Variable {name}
      </label>
      <input
        id={`value-input-for-variable-${name}`}
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={value === Number.EPSILON ? 0 : value}
        onChange={setVariableOnChange('value')}
      />

      <RangeSlider
        name={`range-slider-for-variable-${name}`}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={setVariableOnChange('value')}
      />

      <label
        className={'sr-only'}
        htmlFor={`min-value-input-for-variable-${name}`}
      >
        Min Value input for Variable {name}
      </label>
      <input
        id={`min-value-input-for-variable-${name}`}
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={min}
        onChange={setVariableOnChange('min')}
      />

      <label
        className={'sr-only'}
        htmlFor={`max-value-input-for-variable-${name}`}
      >
        Max Value input for Variable {name}
      </label>
      <input
        id={`max-value-input-for-variable-${name}`}
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={max}
        onChange={setVariableOnChange('max')}
      />

      <label
        className={'sr-only'}
        htmlFor={`step-value-input-for-variable-${name}`}
      >
        Step Value input for Variable {name}
      </label>
      <input
        id={`step-value-input-for-variable-${name}`}
        className={'userInput'}
        style={{ height: 20, marginLeft: 5, marginRight: 5 }}
        type="text"
        value={step}
        onChange={setVariableOnChange('step')}
      />
    </Wrapper>
  );
};

export default VariableComponent;
