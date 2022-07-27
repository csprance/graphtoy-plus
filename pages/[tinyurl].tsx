import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { PrismaClient } from '@prisma/client';

import Graph from '../components/Graph';
import Gui from '../components/Gui';
import Header from '../components/Header';

// When we hit a page with a tinyurl go and find that from the db and return it as the
// Initial state
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { tinyurl },
  } = context;
  if (typeof tinyurl !== 'string') {
    // Bad URL
    return { props: {} };
  }
  // Query our database to see if we have the url.
  // const AppDataSource = await getDataSource();
  const prisma = new PrismaClient();
  const results = await prisma.tiny_url.findFirst({
    where: {
      url: tinyurl,
    },
  });
  prisma.$disconnect()
  // No Results
  if (!results) {
    return { props: {} };
  }
  // Return results
  return {
    props: { initialZustandState: results.value },
  };
};

function TinyUrlPage({
  state,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className="parts">
        <div className="part">
          <Graph />
        </div>
        <div className="part">
          <Gui />
        </div>
      </div>
    </>
  );
}

export default TinyUrlPage;
