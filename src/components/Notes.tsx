import * as React from 'react';
import styled from 'styled-components';

import { useStore } from '../store';
import { bgColor, ctrlColor, inputBg } from '../styles';

const Wrapper = styled.div`
  background: ${bgColor};
  display: grid;
  padding: 10px;
  grid-template-rows: 30px auto;
  border-radius: 5px;
`;
const CustomTextArea = styled.textarea`
  border-radius: 5px;
  background: ${inputBg};
  border-color: transparent;
  resize: vertical;
  :focus {
    outline: ${ctrlColor} solid 2px;
  }
`;
interface Props {}
const Notes: React.FC<Props> = () => {
  const { notes, setNotes } = useStore();
  return (
    <Wrapper>
      <h3 style={{ padding: 0, margin: 0, width: '100%', textAlign: 'center' }}>
        Notes
      </h3>
      <CustomTextArea
        value={notes}
        className={'userInput'}
        onChange={(e) => setNotes(e.target.value)}
        name="notes"
        id="notes"
        cols={30}
        rows={10}
      />
    </Wrapper>
  );
};

export default Notes;
