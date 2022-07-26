import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import * as React from "react";

import { extendMath } from "../lib/graphtoy/lib";
import { Provider, State, useCreateStore } from "../store";
import { GlobalStyles, PrismA11lyTheme } from "../styles";


extendMath();

const MyApp = ({
  Component,
  pageProps,
}: AppProps & { state: State }) => {
  const createStore = useCreateStore(pageProps);
  createStore().subscribe((state)=> {
    // On every state change store state in cookies
    const stateNew = JSON.stringify({... state, grapher: null });
    setCookie(null, 'graphtoy-plus', stateNew);
  })
  return (
    <Provider createStore={createStore}>
      <GlobalStyles />
      <PrismA11lyTheme />
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  const state = JSON.parse(cookies['graphtoy-plus']);
  return { ...appProps, pageProps: state };
};

export default MyApp;
