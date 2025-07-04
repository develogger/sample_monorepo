export const RefundFeeInquirySchema = gql`
  query RefundFeeInquiry($method: InstantPayoutActionTypeEnum) {
    RefundFeeInquiry(method: $method) {
      base_fee
      step_amount
      step_fee
    }
  }
`;
export const AddRefundMutationSchema = gql`
  mutation AddRefund(
    $session_id: ID!
    $amount: BigInteger!
    $description: String
    $reason: RefundReasonEnum
    $method: InstantPayoutActionTypeEnum
  ) {
    AddRefund(
      session_id: $session_id
      amount: $amount
      description: $description
      reason: $reason
      method: $method
    ) {
      id
      amount
      fee
      terminal_id
      timeline {
        created_time
        created_reference
        canceled_time
        in_bank_time
        in_bank_name
        verified_time
        verified_reference
        reconciled_time
        refund_amount
        refund_time
      }
    }
  }
`;
