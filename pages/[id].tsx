import { initializeApollo } from "../lib/apolloClient";
import { GetLottieQuery } from "../graphql/getLottieQuery";
import { LottieResponse } from "../types/ServerSideProps";
import React, { useState } from "react";
import LottiePlayer from "../components/LottiePlayer";
import moment from "moment";
import Head from "next/head";

export default function Lottie({ data }: LottieResponse) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(data.lottie.assetUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      {/*SEO Meta fields for easier search*/}
      <Head>
        <title>{data.lottie.title} | LottieFiles</title>
        <meta
          property="og:title"
          content={data.lottie.title + " on Lottiefiles. Free Lottie Animation"}
        />
        <meta
          name="description"
          content={data.lottie.title + " Free on LottieFiles"}
        />
        <meta
          name="og:description"
          content={data.lottie.title + " Free on LottieFiles"}
        />
      </Head>
      <section className="pr-1 pl-1 pt-5 container mx-auto bg-white">
        <div className="flex flex-col mx-auto w-full h-full">
          <div className="flex items-center">
            <div className="flex flex-col w-full h-full justify-between">
              <div
                className="flex justify-center items-center w-full"
                style={{ height: "540px" }}
              >
                <LottiePlayer
                  src={data.lottie.assetUrl}
                  controls={true}
                  id={data.lottie.id}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <p className="tracking-wide font-semibold text-2xl">
            {data.lottie.title}
          </p>
          <p className="font-light text-gray-500 text-sm pt-2">
            {moment(data.lottie.createdAt).fromNow()}
          </p>
          <div className="pt-5 flex justify-between">
            <p className="mb-2 opacity-75 text-sm tracking-wide">
              Lottie Animation URL
            </p>
            {copied && <p className="text-lf-teal">Copied!</p>}
          </div>
          <div className="items-center relative">
            <div className="flex items-center relative">
              <input
                type="text"
                disabled={true}
                value={data.lottie.assetUrl}
                className="outline-none p-2.5 bg-gray-200 rounded pr-10 text-sm w-full text-grey-darker"
              />
              <img
                src="https://static.lottiefiles.com/images/svg/copy.svg"
                className="absolute right-0 mr-1 hover:bg-lf-teal focus:bg-lf-teal-dark text-white cursor-pointer p-2 rounded"
                alt="Copy icon"
                onClick={onCopy}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      id: props.query.id,
    },
    query: GetLottieQuery,
  });
  return { props: { data: data.data } };
}
