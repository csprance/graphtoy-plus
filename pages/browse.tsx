import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as React from 'react';

import GrapherComponentList from '../components/GrapherComponentList';
import { prisma } from '../lib/prisma';
import { tiny_url } from '.prisma/client';
import Header from "../components/Header";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the latest 10 Graphs
  const latest = await prisma.tiny_url.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
  // Get the top 10 Most popular Graphs
  const popular = await prisma.tiny_url.findMany({
    orderBy: { hits: 'desc' },
    take: 10,
  });
  const mapByDate = (l: tiny_url) => ({
    ...l,
    createdAt: l.createdAt.toString(),
  });
  return {
    props: {
      latest: latest.map(mapByDate),
      popular: popular.map(mapByDate),
    },
  };
};

function Browse({
  latest,
  popular,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
    <div>
      <h2>Popular</h2>
      <GrapherComponentList grapherList={popular} />
      <h2>Latest</h2>
      <GrapherComponentList grapherList={latest} />
    </div>
      </>
  );
}

export default Browse;
