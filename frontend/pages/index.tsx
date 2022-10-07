import Button from 'atoms/Button';
import Input from 'atoms/Input';
import Card from 'molecules/Card';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login ZettaBlock</title>
        <meta name="description" content="ZettaBlock login" />
      </Head>

      <main className={styles.main}>
        <Card />
      </main>

      <footer className={styles.footer}>
        <a href="https://zettablock.com" target="_blank" rel="noopener noreferrer">
          Powered by &nbsp;
          <span className={styles.logo}>
            <Image src="/zettablock.jpg" alt="ZettaBlock Logo" width={60} height={60} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
