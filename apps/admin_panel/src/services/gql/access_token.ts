export const UserAccessTokenschema = gql`
  query GetUserAccessTokens {
    AccessTokens {
      id
      client_id
      client_type
      name
      avatar
      login_ip
      current
      country
      country_code
      updated_at
      current
    }
  }
`;
export const AccessTokenRemoveMutationSchema = gql`
  mutation AccessTokenRemove($token_id: ID!) {
    AccessTokenRemove(token_id: $token_id)
  }
`;
export const PersonalAccessTokenMutationSchema = gql`
  mutation PersonalAccessToken($token_name: String!) {
    PersonalAccessToken(token_name: $token_name) {
      id
      personal_token
      client_name
      client_type
      client_id
      name
      login_ip
      country

      updated_at
    }
  }
`;
