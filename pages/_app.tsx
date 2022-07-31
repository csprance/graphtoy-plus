import { AppProps } from 'next/app';
import Head from 'next/head';
import { setCookie } from 'nookies';
import * as React from 'react';

import { TooltipStyles } from '../components/Tooltip/tooltip-styles';
import { extendMath } from '../lib/graphtoy/lib';
import { Provider, State, useCreateStore } from '../store';
import { GlobalStyles, PrismA11lyTheme } from '../styles';

extendMath();

const MyApp = ({ Component, pageProps }: AppProps & { state: State }) => {
  const createStore = useCreateStore(pageProps.initialZustandState);
  React.useEffect(() => {
    createStore().subscribe((state) => {
      // On every state change store state in cookies
      const stateNew = JSON.stringify({ ...state, grapher: null });
      setCookie(null, 'graphtoy-plus', stateNew);
    });
  }, [createStore]);
  return (
    <Provider createStore={createStore}>
      <GlobalStyles />
      <PrismA11lyTheme />
      <TooltipStyles />
      <Head>
        <title>GraphToy +</title>
        <meta
          name="viewport"
          content={
            'initial-scale=1, ' +
            'minimum-scale=1, ' +
            'width=device-width, ' +
            'height=device-height'
          }
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
