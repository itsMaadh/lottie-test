import { gql } from "@apollo/client/core";
import React from "react";
import { initializeApollo } from "../lib/apolloClient";
import LottieTile from "./LottieTile";
import { LottieResponse } from "../types/LottieResponse";

const GET_RECENT_LOTTIES = gql`
  query lotties(
    $first: Float
    $last: Float
    $after: String
    $before: String
    $filter: String
    $sort: String!
  ) {
    lotties(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: $filter
      sort: $sort
    ) {
      page {
        edges {
          node {
            id
            assetUrl
            featured
            title
            createdAt
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
        }
      }
      pageData {
        count
        limit
        offset
      }
    }
  }
`;

export default function recent({ data }: LottieResponse) {
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div>
      <h3 className=" pt-6 font-semibold text-4xl">
        Recently uploaded Lotties:
      </h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        Your access to the world’s largest collection of free-to-use animations.
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 pb-10">
        {data.page.edges.map((lottie) => (
          <LottieTile
            assetUrl={lottie.node.assetUrl}
            title={lottie.node.title}
            key={lottie.node.id}
            createdAt={lottie.node.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: 6,
      filter: "",
      sort: "recent",
    },
    query: GET_RECENT_LOTTIES,
  });
  return { props: { data: data.data.lotties } };
}
