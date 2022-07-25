import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';

import { extendMath } from '../lib/graphtoy/lib';
import { AsyncStorage, useStore } from '../store';
import { GlobalStyles, PrismA11lyTheme } from '../styles';

extendMath();

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    if (useStore.persist) {
      useStore.persist.setOptions({ getStorage: () => AsyncStorage });
      useStore.persist.rehydrate();
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <PrismA11lyTheme />
      <Head>
        <title>GraphToy +</title>
        <meta
          name="viewport"
          content={
            'user-scalable=0, initial-scale=1, ' +
            'minimum-scale=1, width=device-width, height=device-height'
          }
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
