import * as React from 'react';

interface Props {}
const Header: React.FC<Props> = () => {
  return (
    <div className="ml">
      <h1>Graphtoy + v0.4.1</h1>
      by <a href="https://iquilezles.org/">Inigo Quilez</a> (feedback from Rafæl
      Couto, Florian Mosleh, Nicholas Ralabate and Rich Eakin, extras by Chris
      Sprance). If you find Graphtoy useful, please consider supporting it by
      donating through my
      <a
        href="https://www.patreon.com/inigoquilez"
        style={{
          backgroundColor: '#ff424d',
          paddingLeft: 12,
          paddingRight: 12,
          color: '#ffffff',
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 12,
          fontWeight: 'bold',
        }}
      >
        Patreon
      </a>
      or
      <a
        href="http://paypal.me/inigoquilez"
        style={{
          backgroundColor: '#0070ba',
          paddingLeft: 12,
          paddingRight: 12,
          color: '#ffffff',
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 12,
          fontWeight: 'bold',
        }}
      >
        PayPal
      </a>
      .
    </div>
  );
};

export default Header;
