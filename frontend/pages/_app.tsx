import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import './fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
