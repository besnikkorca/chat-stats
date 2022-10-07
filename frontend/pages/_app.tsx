import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import '../fonts';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ZettaBlock</title>
        <meta name="description" content="ZettaBlock is a one-stop blockchain data platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
