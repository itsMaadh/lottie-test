import { gql } from "@apollo/client/core";

export const SaveLottieMutation = gql`
  mutation createLottie($createLottieInput: CreateLottieInput!) {
    createLottie(createLottieInput: $createLottieInput) {
      id
    }
  }
`;
