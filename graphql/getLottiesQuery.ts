import { gql } from "@apollo/client/core";

export const GetLottiesQuery = gql`
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
