import useUserData from 'contexts/User/useUserData';
import Footer from 'molecules/Footer';
import type { NextPage } from 'next';
import Head from 'next/head';
import LoginCard from 'organisms/LoginCard/LoginCard';
import { useEffect, useState } from 'react';
import { useLoginMutation } from 'services/graphql/generated/graphql';
import perfReq from 'services/graphql/perfReq';
import styles from '../styles/Home.module.scss';

const Login: NextPage = () => {
  const { setExpirationToken } = useUserData();
  const [mutate, { data }] = useLoginMutation();
  const [email, setEmail] = useState('besnik.korca1@gmail.com');
  const [password, setPassword] = useState('testtest');

  const handleLogin = async () => {
    await perfReq(
      mutate({
        variables: { loginInput: { email, password } },
      })
    );
  };

  useEffect(() => {
    if (data?.login.expirationToken) {
      setExpirationToken(data?.login.expirationToken);
    }
  }, [data, setExpirationToken]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login ZettaBlock</title>
        <meta name="description" content="ZettaBlock login" />
      </Head>

      <main className={styles.main}>
        <LoginCard {...{ email, setEmail, password, setPassword, onLogin: handleLogin }} />
      </main>

      <Footer />
    </div>
  );
};

export default Login;
