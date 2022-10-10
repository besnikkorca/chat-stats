import Footer from 'molecules/Footer';
import Header from 'molecules/Header/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login ZettaBlock</title>
        <meta name="description" content="ZettaBlock login" />
      </Head>

      <Header />
      <main className={styles.main}>
        <h1>Home</h1>
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      requiresAuth: true,
    },
  };
}

export default Home;
