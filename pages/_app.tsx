import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Layout from "../components/Layout";
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Test | LottieFiles</title>
        <meta name="content-language" content="en" />
        <meta name="locale" content="en" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
