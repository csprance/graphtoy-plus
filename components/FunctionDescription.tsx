import * as React from 'react';
import styled from 'styled-components';

import { FunctionParam } from '../lib/graphtoy/constants';

const Wrapper = styled.div`
  display: grid;
`;
const FunctionName = styled.div`
  display: grid;
  color: #ffd700;
  margin-bottom: 10px;
`;
const FunctionDescriptionP = styled.div`
  display: grid;
`;
interface Props {
  description: string | string[];
  text: string;
  params: FunctionParam[];
  name: string;
}

function mapDescription(description: string | string[]) {
  let mappedDescription: JSX.Element[] = [];
  if (Array.isArray(description)) {
    mappedDescription = description.map((d, idx) => <span key={idx}>{d}</span>);
  } else {
    mappedDescription = [<span key={'single-description'}>{description}</span>];
  }
  return mappedDescription;
}
const FunctionDescription: React.FC<Props> = ({
  params,
  description,
  text,
  name,
}) => {
  return (
    <Wrapper>
      <FunctionName>{name}</FunctionName>
      <FunctionDescriptionP>{mapDescription(description)}</FunctionDescriptionP>
      {params.map((param) => (
        <p style={{ marginBottom: 2 }} key={`${name}-${param.name}`}>
          <span style={{ color: '#eb68ff' }}>{param.name}</span> -{' '}
          {mapDescription(param.description)}
        </p>
      ))}
    </Wrapper>
  );
};

export default FunctionDescription;
