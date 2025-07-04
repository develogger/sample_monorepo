export const CouponSchema = gql`
  query GetCoupons($terminal_id: ID!, $limit: Int, $offset: Int, $filter: CouponFilterEnum) {
    Coupons: Coupons(
      terminal_id: $terminal_id
      limit: $limit
      offset: $offset
      filter: $filter
      pagination: true
    ) {
      id
      expired_at
      code
      deleted_at
      status
      limit
      used
      min_amount
      discount_percent
      max_discount_amount
      products {
        id
      }
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const couponRemoveMutationSchema = gql`
  mutation CouponRemove($id: ID!) {
    CouponRemove(id: $id)
  }
`;

export const couponRestoreMutationSchema = gql`
  mutation CouponRestore($id: ID!) {
    CouponRestore(id: $id) {
      id
    }
  }
`;
export const EditCouponMutationSchema = gql`
  mutation CouponEdit(
    $id: ID!
    $limit: Int
    $min_amount: Int
    $max_discount_amount: Int
    $discount_percent: Int
    $code: String
    $expired_at: DateTime
  ) {
    CouponEdit(
      id: $id
      limit: $limit
      min_amount: $min_amount
      max_discount_amount: $max_discount_amount
      discount_percent: $discount_percent
      code: $code
      expired_at: $expired_at
    ) {
      id
    }
  }
`;

export const NewCouponMutationSchema = gql`
  mutation CouponAdd(
    $terminal_id: ID!
    $discount_percent: Int!
    $code: String!
    $max_discount_amount: Int
    $min_amount: Int!
    $limit: Int
    $expired_at: DateTime
  ) {
    CouponAdd(
      terminal_id: $terminal_id
      min_amount: $min_amount
      discount_percent: $discount_percent
      code: $code
      limit: $limit
      max_discount_amount: $max_discount_amount
      expired_at: $expired_at
    ) {
      id
    }
  }
`;

export const AssignProductMutationSchema = gql`
  mutation CouponAssignProduct($id: ID!, $product_ids: [ID]) {
    CouponAssignProduct(id: $id, product_ids: $product_ids) {
      id
    }
  }
`;

export const CouponByIdSchema = gql`
  query GetCouponById($id: ID, $terminal_id: ID!) {
    Coupons(id: $id, terminal_id: $terminal_id) {
      id
      expired_at
      code
      status
      limit
      min_amount
      used
      discount_percent
      max_discount_amount
      products {
        id
      }
    }
  }
`;
