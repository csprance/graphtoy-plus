import * as React from 'react';
import styled from 'styled-components';

import { useStore } from '../store';
import Button from './Button';
import Coords from './Coords';
import Time from './Time';
import TimelineBar from './TimelineBar';
import PauseIcon from './icons/PauseIcon';
import PlayIcon from './icons/PlayIcon';
import ResetIcon from './icons/ResetIcon';

const Wrapper = styled.div`
  max-height: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 150px auto 150px 80px 80px;
  align-items: center;
  padding-top: 8px;
`;

interface Props {}
const TimelineControls: React.FC<Props> = () => {
  const { grapher } = useStore();
  const [paused, setPaused] = React.useState(false);

  return (
    <Wrapper>
      <Coords />
      <TimelineBar />
      <Time />

      <Button name={'reset-time'} onClick={() => grapher.resetTime()}>
        <ResetIcon />
      </Button>

      <Button
        name={paused ? 'start-time' : 'pause-time'}
        onClick={() => {
          setPaused(!paused);
          grapher.togglePlay();
        }}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </Button>
    </Wrapper>
  );
};

export default TimelineControls;
