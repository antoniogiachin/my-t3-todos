import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";

import Head from "next/head";
import { Layout } from "../components/layout/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>TODO-AG-APP!</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta charSet="utf-8" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
