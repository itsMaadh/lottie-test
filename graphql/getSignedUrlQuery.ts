import { gql } from "@apollo/client/core";

export const GetSignedUrlQuery = gql`
  query getSignedUrl {
    signedUrl {
      filename
      signedUrl
    }
  }
`;
