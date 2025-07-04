export const TicketsSchema = gql`
  query GetTickets($id: ID, $limit: Int, $offset: Int, $status: TicketStatusEnum) {
    Tickets: Tickets(id: $id, limit: $limit, offset: $offset, status: $status, pagination: true) {
      title
      id
      status
      updated_at
      first_user_seen
      rate
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const DepartmentsSchema = gql`
  query GetDepartment {
    TicketDepartments {
      id
      title
      user_access
    }
  }
`;

export const AddTicketMutationSchema = gql`
  mutation TicketAdd(
    $ticket_department_id: ID!
    $title: String!
    $content: String!
    $attachment: String
    $priority: TicketPriorityEnum
    $model_type: ModelEnum
    $model_id: ID
  ) {
    TicketAdd(
      ticket_department_id: $ticket_department_id
      title: $title
      content: $content
      attachment: $attachment
      priority: $priority
      model_type: $model_type
      model_id: $model_id
    ) {
      id
    }
  }
`;

export const AddTicketReplyMutationSchema = gql`
  mutation TicketAddReply($ticket_id: ID!, $content: String!, $attachment: String) {
    TicketAddReply(ticket_id: $ticket_id, content: $content, attachment: $attachment) {
      id
    }
  }
`;

export const TicketCloseMutateSchema = gql`
  mutation TicketClose($id: ID!) {
    TicketClose(id: $id)
  }
`;

export const TicketFeedbackSchema = gql`
  mutation TicketFeedback($id: ID!, $rate: Int) {
    TicketFeedback(id: $id, rate: $rate)
  }
`;

export const TicketDetailsSchema = gql`
  query GetTicketById($id: ID!) {
    Tickets(id: $id) {
      id
      status
      title
      created_at
      updated_at
      rate
      model_id
      replies {
        id
        content
        attachment
        created_at
        user {
          name
          id
          managed_avatar
        }
      }
    }
  }
`;

export const UnreadTicketsCountSchema = gql`
  query GetTicketCount {
    UnreadTicketsCount
  }
`;
