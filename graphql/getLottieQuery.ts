import { gql } from "@apollo/client/core";

export const GetLottieQuery = gql`
  query lottie($id: String!) {
    lottie(id: $id) {
      id
      assetUrl
      featured
      title
      createdAt
    }
  }
`;
