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
        <meta
          property="og:title"
          content={"LottieFiles. Free Lottie Animations"}
        />
        <meta
          name="description"
          content={"Get latest new animations free on LottieFiles"}
        />
        <meta
          name="og:description"
          content={"Get latest new animations free on LottieFiles"}
        />
        <link rel="icon" href="/favicon.png" />
        <link href="/fonts/poppins.css" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
