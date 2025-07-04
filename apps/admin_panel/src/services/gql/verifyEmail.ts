export const VerifyEmailSchema = gql`
  mutation VerifyEmail($otp_code: String!) {
    VerifyEmail(otp_code: $otp_code)
  }
`;
