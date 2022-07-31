import Link from 'next/link';
import * as React from 'react';

import Grapher from '../lib/graphtoy';
import { MyStore } from '../store';
import GrapherComponent from './GrapherComponent';
import { tiny_url } from '.prisma/client';

interface Props {
  grapherList: tiny_url[];
}
const GrapherComponentList: React.FC<Props> = ({ grapherList }) => {
  return (
    <>
      {grapherList.map((t) => {
        const { id, url, value } = t;
        const { formulas, variables, notes } = value as unknown as MyStore;
        return (
          <div key={id} style={{ width: 400, height: 400 }}>
            <Link href={`/${url}`} passHref>
              <a> {url}</a>
            </Link>
            <div>{notes}</div>
            <div>
              <GrapherComponent
                formulas={formulas}
                variables={variables}
                grapher={new Grapher()}
                extraInit={(grapher) => {
                  grapher.toggleVisualizer();
                }}
              />
              {formulas.map((f) => (
                <div key={f.value}>{f.value}</div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GrapherComponentList;
