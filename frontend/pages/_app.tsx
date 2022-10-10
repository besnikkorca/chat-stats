import '../styles/globals.scss';
import '../fonts';
import Head from 'next/head';
import RouteGuard from 'components/RouteGuard';
import ApolloProvider from 'services/graphql/ApolloProvider';
import UserProvider from 'contexts/User/UserProvider';
import type { AppProps } from 'types/global';
import SessionManager from 'services/Session/SessionManager';

function MyApp({ Component, pageProps: { requiresAuth = false, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>ZettaBlock</title>
        <meta name="description" content="ZettaBlock is a one-stop blockchain data platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider>
        <UserProvider>
          <SessionManager>
            <RouteGuard requiresAuth={requiresAuth}>
              <Component {...pageProps} />
            </RouteGuard>
          </SessionManager>
        </UserProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
