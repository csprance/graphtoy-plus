import * as React from 'react';
import styled from 'styled-components';

import packageJSON from '../package.json';

const Wrapper = styled.div``;
const Title = styled.h1`
  margin-right: 5px;
`;
const BubbleLink = styled.a`
  background-color: ${({ color }) => color};
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 5px;
`;
interface Props {}
const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Title>
        Graphtoy<span style={{ color: 'skyblue' }}>+</span> v
        {packageJSON.version}
      </Title>
      <span>
        by <a href="components/Header">Inigo Quilez</a> (feedback from Rafæl
        Couto, Florian Mosleh, Nicholas Ralabate and Rich Eakin, Graphtoy-Plus
        extras by
        <a href="https://csprance.com"> Chris Sprance</a>). If you find Graphtoy
        useful, please consider supporting it by donating through my
        <BubbleLink
          color={'#ff424d'}
          href="https://www.patreon.com/inigoquilez"
        >
          Patreon
        </BubbleLink>
        or
        <BubbleLink color={'#0070ba'} href="http://paypal.me/inigoquilez">
          PayPal
        </BubbleLink>
      </span>
    </Wrapper>
  );
};

export default Header;
