import * as React from 'react';

interface Props {}
const Notes: React.FC<Props> = ({}) => {
  return (
      <div className="guiWindow">
          <div className="uiFuncPanel">
       <textarea name="notes" id="notes" cols={30} rows={10}></textarea>
   </div>
      </div>
  );
}

export default Notes;
