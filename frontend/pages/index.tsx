import Table from 'atoms/Table';
import Footer from 'molecules/Footer';
import Header from 'molecules/Header/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import useDeleteAPIEntry from 'services/query/helpers/useDeleteAPIEntry';
import useMutateAPIEntry from 'services/query/helpers/useMutateAPIEntry';
import useParsedEntries from 'services/query/helpers/useParsedEntries';
import { APIEntry } from 'types/api';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const {
    headers,
    parsedEntries,
    handleEdit,
    active,
    setActive,
    sortBy,
    setSortBy,
    search,
    setSearch,
  } = useParsedEntries();

  const { delete: deleteAPIEntry } = useMutateAPIEntry();

  return (
    <div className={styles.container}>
      <Head>
        <title>Login ZettaBlock</title>
        <meta name="description" content="ZettaBlock login" />
      </Head>

      <Header />
      <main className={styles.main}>
        <div>
          <Table<APIEntry>
            onDelete={deleteAPIEntry.mutate}
            isLoadingDelete={deleteAPIEntry.isLoading}
            active={active}
            setActive={setActive}
            indexed={false}
            headers={headers as (keyof APIEntry)[]}
            editable={['description']}
            onEdit={handleEdit}
            entries={parsedEntries}
            sortable
            sortBy={sortBy}
            setSortBy={setSortBy}
            search={search}
            setSearch={setSearch}
          />
        </div>
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
