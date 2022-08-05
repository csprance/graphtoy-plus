import * as React from 'react';
import styled from 'styled-components';

import { FUNCS } from '../lib/graphtoy/constants';
import Button from './Button';
import FunctionDescription from './FunctionDescription';
import GuiWindow from './GuiWindow';
import Tooltip from './Tooltip';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 5px;
  min-width: 250px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 12px;
  column-gap: 12px;
`;

interface Props {}
const FunctionButtons: React.FC<Props> = () => {
  const inject = (value: string) => {
    document.execCommand('insertText', false, value);
  };
  return (
    <GuiWindow>
      <Container>
        {FUNCS.map((funcs, idx1) => (
          <Wrapper key={`${idx1}`}>
            {Object.entries(funcs).map(
              ([key, { description, text, params }]) => (
                <Tooltip
                  content={
                    <FunctionDescription
                      name={key}
                      description={description}
                      text={text}
                      params={params}
                    />
                  }
                  direction="right"
                  key={key}
                >
                  <Button
                    style={{ minWidth: '100%', height: '30px', margin: 0 }}
                    name={key}
                    onClick={() => inject(text)}
                  >
                    {key}
                  </Button>
                </Tooltip>
              ),
            )}
          </Wrapper>
        ))}
      </Container>
    </GuiWindow>
  );
};

export default FunctionButtons;
