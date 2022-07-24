import * as React from 'react';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs';
import 'prismjs/components/prism-markdown';

import {useStore} from '../store';
import {bgColor, ctrlColor, inputBg} from '../styles';

const Wrapper = styled.div`
  background: ${bgColor};
  display: grid;
  padding: 10px;
  grid-template-rows: 30px auto;
  border-radius: 5px;
`;
const CustomTextArea = styled(Editor)`
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
        highlight={(code)=> highlight(code, languages.markdown, 'md')}
        onValueChange={(code) => setNotes(code)}
        name="notes"
        padding={10}
        id="notes"
        style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
        }}
      />
    </Wrapper>
  );
};

export default Notes;
