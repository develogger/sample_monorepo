export const NewZarinLinksSchema = gql`
  query GetNewZarinLinks(
    $id: ID
    $type: ZarinLinkTypeEnum
    $terminal_id: ID
    $title: String
    $offset: Int
    $amount_type: ZarinLinkAmountTypeEnum
    $amount: Int
    $max_amount: Int
    $min_amount: Int
    $description: String
    $successful_redirect_url: String
    $limit: Int
    $filter: ZarinLinkFilterEnum
  ) {
    NewZarinLinks: NewZarinLinks(
      id: $id
      type: $type
      terminal_id: $terminal_id
      title: $title
      amount_type: $amount_type
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      offset: $offset
      description: $description
      successful_redirect_url: $successful_redirect_url
      failed_redirect_url: $successful_redirect_url
      filter: $filter
      limit: $limit
      pagination: true
    ) {
      id
      link
      title
      limit
      type
      created_at
      deleted_at
      amount
      amount_type
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

export const ZarinLinkByIdSchema = gql`
  query GetZarinLinkById($terminal_id: ID, $id: ID, $type: ZarinLinkTypeEnum) {
    NewZarinLinks(terminal_id: $terminal_id, id: $id, type: $type) {
      id
      title
      link
      description
      show_receipt
      is_coupon_active
      amount
      limit
      deleted_at
      updated_at
      created_at
      required_fields {
        input
        status
        placeholder
      }
      successful_redirect_url
      failed_redirect_url
      amount_type
      type
      specifications {
        key
        value
      }
      meta_data {
        start_date
        start_time
        end_time
        end_date
        event_type
        province
        city
        address
        url
        target_amount
      }
      category {
        id
        title
        parent {
          id
          title
        }
      }
      images {
        id
        url
      }
      coupons {
        id
        discount_percent
        code
      }
    }
  }
`;

export const ZarinLinkCreateMutationSchema = gql`
  mutation ZarinLinkCreateMutation(
    $terminal_id: ID!
    $title: String!
    $amount: Int!
    $description: String!
    $show_receipt: Boolean!
    $is_coupon_active: Boolean!
    $required_fields: [ZarinLinkRequiredFieldsInput]
    $limit: Int
    $type: ZarinLinkTypeEnum
    $successful_redirect_url: String
    $failed_redirect_url: String
    $amount_type: ZarinLinkAmountTypeEnum
    $meta_data: ZarinLinkMetaDataInput
    $specifications: [ZarinLinkSpecificationInput]
    $category_id: Int
  ) {
    NewZarinLinkAdd(
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
      type: $type
      amount_type: $amount_type
      meta_data: $meta_data
      specifications: $specifications
      category_id: $category_id
    ) {
      id
    }
  }
`;

export const ZarinLinkUpdateMutationSchema = gql`
  mutation ZarinLinkUpdateMutation(
    $terminal_id: ID!
    $id: ID!
    $title: String!
    $amount: Int!
    $description: String!
    $show_receipt: Boolean!
    $is_coupon_active: Boolean!
    $required_fields: [ZarinLinkRequiredFieldsInput]
    $limit: Int
    $type: ZarinLinkTypeEnum
    $successful_redirect_url: String
    $failed_redirect_url: String
    $amount_type: ZarinLinkAmountTypeEnum
    $meta_data: ZarinLinkMetaDataInput
    $specifications: [ZarinLinkSpecificationInput]
    $category_id: Int
  ) {
    NewZarinLinkEdit(
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
      type: $type
      amount_type: $amount_type
      meta_data: $meta_data
      specifications: $specifications
      category_id: $category_id
    ) {
      id
    }
  }
`;
export const ZarinLinkCategoriesSchema = gql`
  query ZarinLinkCategories($type: CategoryTypeEnum) {
    ZarinLinkCategories(type: $type) {
      id
      title
      slug
      type
      children {
        id
        title
      }
    }
  }
`;

export const UpdateZarinLinkSettingBrandingSchema = gql`
  mutation UpdateZarinLinkSettingBranding(
    $terminal_id: Int!
    $template: TerminalTemplateSettingInput
    $bio: String
    $contacts: TerminalContactsInput
  ) {
    TerminalSettingBranding(
      terminal_id: $terminal_id
      template: $template
      bio: $bio
      contacts: $contacts
    ) {
      bio
      template {
        primary_color
        secondary_color
      }
      contacts {
        phone
        email
        address
        socials {
          telegram
          facebook
          instagram
          twitter
          youtube
          linkedin
          discord
          github
          eta
          whatsapp
          aparat
        }
      }
    }
  }
`;

export const GetZarinLinkSettingBrandingSchema = gql`
  query GetZarinLinkSettingBranding($terminal_id: ID!) {
    TerminalBrandingSetting(terminal_id: $terminal_id) {
      bio
      template {
        primary_color
        secondary_color
      }
      contacts {
        phone
        email
        address
        socials {
          telegram
          facebook
          instagram
          twitter
          youtube
          linkedin
          discord
          github
          eta
          whatsapp
          aparat
        }
      }
    }
  }
`;

export const ZarinLinkTransactionsAggregateSchema = gql`
  query GetZarinLinkTransactionsAggregate($terminal_id: ID!, $relation_id: ID!) {
    ZarinLinkTransactionsAggregate(terminal_id: $terminal_id, relation_id: $relation_id) {
      all {
        count
        amount
      }
      current_day {
        count
        amount
      }
      current_month {
        count
        amount
      }
    }
  }
`;
