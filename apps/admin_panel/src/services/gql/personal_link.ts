export const PersonalLinkRequestMutationSchema = gql`
  mutation PersonalLinkRequest($username: String!) {
    PersonalLinkRequest(username: $username) {
      id
      domain
    }
  }
`;
