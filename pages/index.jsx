// import {useContext} from 'react';
import Head from 'next/head';

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";

// import { log } from "@/lib/utils/formatters";


import { Inter } from 'next/font/google';
// import { Button, EditIcon } from '@/components/mui';
// import { UIContext } from '@/components/contexts/UI.context';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from "@/components/QueryBoundaries";
import Paragraph from '@/components/Paragraph';
import ProductList from "@/components/ProductList";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Heading component="h2">Products</Heading>
      <QueryBoundaries>
        <ProductList />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.</Paragraph>
        {/* <Button variant="contained"><EditIcon />Button</Button> */}
        </QueryBoundaries>
      </Layout>

    </>
  )
}

export async function getStaticProps(context) {
  // console.log("LLLL", context);
  const products = await fetchProducts().catch((err) => console.log(err));
  const queryClient = new QueryClient();


  // If this was remote we'd use 'prefetchQuery' but as we know it we use 'setQueryData'
  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}