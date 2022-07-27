import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';

import Graph from '../components/Graph';
import Gui from '../components/Gui';
import Header from '../components/Header';
import { useStore } from '../store';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  if ('graphtoy-plus' in cookies) {
    const state = JSON.parse(cookies['graphtoy-plus']);
    return {
      props: {
        initialZustandState: state,
      },
    };
  }
  return {
    props: {},
  };
};

function App() {
  const { parseUrlFormulas } = useStore();
  React.useEffect(() => {
    parseUrlFormulas();
  }, [parseUrlFormulas]);
  return (
    <>
      <Header />
      <div className="parts">
        <div className="part">
          <Graph />
        </div>
        <div className="part">
          <Gui />
        </div>
      </div>
    </>
  );
}

export default App;
