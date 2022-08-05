import Link from 'next/link';
import * as React from 'react';

import Grapher from '../lib/graphtoy';
import { MyStore } from '../store';
import GrapherComponent from './GrapherComponent';
import { tiny_url } from '.prisma/client';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-template-columns: auto auto auto auto;
`;

interface Props {
  grapherList: tiny_url[];
}
const GrapherComponentList: React.FC<Props> = ({ grapherList }) => {
  return (
    <Wrapper>
      {grapherList.map((t) => {
        const { id, url, value } = t;
        const { formulas, variables, notes } = (value as unknown) as MyStore;
        return (
          <div key={id}>
            <Link href={`/${url}`} passHref>
              <a><h3> {url}</h3></a>
            </Link>
            <div>{notes}</div>
            <div style={{ width: 400, height: 400 }}>
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
    </Wrapper>
  );
};

export default GrapherComponentList;
