import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottiesResponse } from "../types/ServerSideProps";
import Title from "../components/Title";
import { DEFAULT_TAKE } from "../lib/constants";
import Pagination from "../components/Pagination";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import Description from "../components/Description";

interface ILottieResponse extends LottiesResponse {
  query: string;
}

export default function search({ data, query }: ILottieResponse) {
  return (
    <>
      <div className="py-6">
        <Title text={"Search results for '" + query + "'"} />
      </div>
      {data.page.edges.length ? (
        <LottiesGrid data={data} />
      ) : (
        <div>
          <div
            className="flex flex-col justify-center items-center text-center w-full "
            style={{ minHeight: "500px" }}
          >
            <Player
              loop={true}
              autoplay={true}
              src={
                "https://assets9.lottiefiles.com/packages/lf20_zxliqmhr.json"
              }
              style={{ height: "430px" }}
              speed={1}
            />
            <Description
              text={"Oops! We could not find any data for your request."}
            />
          </div>
        </div>
      )}
      <Pagination
        pageData={{
          count: data.pageData.count,
          offset: data.pageData.offset,
          startCursor: data.page.pageInfo.startCursor,
          endCursor: data.page.pageInfo.endCursor,
        }}
        route={"featured"}
        searchQuery={query}
      />
    </>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: props.query?.after || !props.query.before ? DEFAULT_TAKE : null,
      last: props.query?.before ? DEFAULT_TAKE : null,
      filter: props.query.q,
      sort: "recent",
      after: props.query?.after ? props.query.after : null,
      before: props.query?.before ? props.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties, query: props.query.q } };
}
