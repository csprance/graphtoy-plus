import * as React from 'react';
import { FUNCS } from '../lib/graphtoy/constants';

interface Props {}
const FunctionButtons: React.FC<Props> = () => {
  const inject = (value: string) => {
    document.execCommand('insertText', false, value);
  };
  return (
    <div className="guiWindow">
      <div className="uiFuncPanel">
        {FUNCS.map((funcs, idx1) => {
          return (
            <div className="uiFuncGrid" key={`${idx1}`}>
              {Object.keys(funcs).map((key) => {
                const { text, description } = funcs[key];
                return (
                  <div
                    key={key}
                    className={key.length < 12 ? "uiFunc" : 'uiFuncB'}
                    onClick={() => inject(text)}
                    title={description}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunctionButtons;
