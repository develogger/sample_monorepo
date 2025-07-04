export const ProductSchema = gql`
  query GetProducts(
    $terminal_id: ID
    $id: ID
    $limit: Int
    $offset: Int
    $filter: ZarinLinkFilterEnum
    $failed_redirect_url: String
    $successful_redirect_url: String
    $description: String
    $title: String
    $amount: Int
    $max_amount: Int
    $min_amount: Int
  ) {
    ZarinLinks: ZarinLinks(
      terminal_id: $terminal_id
      id: $id
      limit: $limit
      offset: $offset
      max_amount: $max_amount
      min_amount: $min_amount
      filter: $filter
      failed_redirect_url: $failed_redirect_url
      successful_redirect_url: $successful_redirect_url
      description: $description
      title: $title
      amount: $amount
      pagination: true
    ) {
      id
      title
      amount
      limit
      deleted_at
      images {
        url
      }
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const ProductOverviewSchema = gql`
  query GetProductsOverview($terminal_id: ID, $filter: ZarinLinkFilterEnum) {
    ZarinLinks(terminal_id: $terminal_id, filter: $filter) {
      id
      title
      amount
      deleted_at
      images {
        url
      }
    }
  }
`;

export const ProductByIdSchema = gql`
  query GetProductsById($terminal_id: ID, $id: ID) {
    ZarinLinks(terminal_id: $terminal_id, id: $id) {
      id
      title
      link
      description
      show_receipt
      is_coupon_active
      amount
      limit
      deleted_at
      required_fields {
        input
        status
        placeholder
      }
      images {
        id
        url
      }
      successful_redirect_url
      failed_redirect_url
    }
  }
`;

export const ProductRemoveMutationSchema = gql`
  mutation ZarinLinkRemove($id: ID!) {
    ZarinLinkRemove(id: $id)
  }
`;

export const ProductRestoreMutationSchema = gql`
  mutation ZarinLinkRestore($id: ID!) {
    ZarinLinkRestore(id: $id) {
      id
    }
  }
`;

export const NewProductImageMutationSchema = gql`
  mutation ZarinLinkAddImage($product_id: ID!, $images: [String!]!) {
    ZarinLinkAddImage(product_id: $product_id, images: $images) {
      id
    }
  }
`;

export const NewProductMutationSchema = gql`
  mutation ZarinLinkAdd(
    $terminal_id: ID!
    $title: String!
    $amount: Int!
    $description: String!
    $show_receipt: Boolean!
    $is_coupon_active: Boolean!
    $required_fields: [ZarinLinkRequiredFieldsInput]
    $limit: Int
    $successful_redirect_url: String
    $failed_redirect_url: String
  ) {
    ZarinLinkAdd(
      terminal_id: $terminal_id
      title: $title
      amount: $amount
      description: $description
      show_receipt: $show_receipt
      is_coupon_active: $is_coupon_active
      required_fields: $required_fields
      limit: $limit
      successful_redirect_url: $successful_redirect_url
      failed_redirect_url: $failed_redirect_url
    ) {
      id
    }
  }
`;

export const EditProductMutationSchema = gql`
  mutation ZarinLinkEdit(
    $id: ID!
    $terminal_id: ID
    $title: String
    $amount: Int
    $description: String
    $show_receipt: Boolean
    $is_coupon_active: Boolean
    $required_fields: [ZarinLinkRequiredFieldsInput]
    $limit: Int
    $successful_redirect_url: String
    $failed_redirect_url: String
  ) {
    ZarinLinkEdit(
      id: $id
      terminal_id: $terminal_id
      title: $title
      amount: $amount
      description: $description
      show_receipt: $show_receipt
      is_coupon_active: $is_coupon_active
      required_fields: $required_fields
      limit: $limit
      successful_redirect_url: $successful_redirect_url
      failed_redirect_url: $failed_redirect_url
    ) {
      id
    }
  }
`;

export const DeleteProductImage = gql`
  mutation ZarinLinkDeleteImage($product_id: ID!, $image_id: String!) {
    ZarinLinkDeleteImage(product_id: $product_id, image_id: $image_id)
  }
`;
