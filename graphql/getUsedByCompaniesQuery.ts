import { gql } from "@apollo/client/core";

export const GetUsedByCompaniesQuery = gql`
  query companies {
    companies {
      id
      name
      assetUrl
    }
  }
`;
