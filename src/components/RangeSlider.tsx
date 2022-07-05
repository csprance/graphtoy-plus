import * as React from 'react';
import styled from 'styled-components';

import { ctrlColor, ctrlColorHover, inputBg } from '../styles';

const SliderInput = styled.input`
  appearance: none;
  width: 100%; /* Full-width */
  height: 5px; /* Specified height */
  background: ${inputBg}; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  transition: opacity 0.2s;
  background: linear-gradient(
    to right,
    #82cfd0 0%,
    #82cfd0 50%,
    #fff 50%,
    #fff 100%
  );
  transition: background 450ms ease-in;
  -webkit-appearance: none;
  :hover {
    opacity: 1; /* Fully shown on mouse-over */
  }
  ::-webkit-slider-thumb {
    appearance: none;
    width: 8px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: ${ctrlColor}; /* Green background */
    cursor: pointer; /* Cursor on hover */
    :hover {
      background: ${ctrlColorHover};
    }
  }
`;

interface Props {
  id?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const RangeSlider: React.FC<Props> = ({
  value = 0,
  min = -1,
  max = 1,
  step = 0.01,
  onChange = (e) => undefined,
  id = '',
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const t = ((value - min) / (max - min)) * 100;
    inputRef.current!.style.background = `linear-gradient(to right, #FFF 0%, #FFF ${t}%, ${inputBg} ${t}%, ${inputBg} 100%)`;
  }, [value, min, max]);
  return (
    <SliderInput
      ref={inputRef}
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      id={id}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

export default RangeSlider;
