import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markdown';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';

import { useStore } from '../store';
import { ctrlColor, inputBg } from '../styles';
import GuiWindow from './GuiWindow';

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
    <GuiWindow>
      <p
        style={{
          fontSize: '17.5px',
          padding: 0,
          margin: 0,
          marginBottom: '10px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Notes
      </p>
      <label className={'sr-only'} htmlFor={`notes-input`}>
        Notes
      </label>
      <CustomTextArea
        textareaId={'notes-input'}
        value={notes}
        className={'userInput'}
        highlight={(code) => highlight(code, languages.markdown, 'md')}
        onValueChange={(code) => setNotes(code)}
        name="notes"
        padding={10}
        id="notes"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </GuiWindow>
  );
};

export default Notes;
