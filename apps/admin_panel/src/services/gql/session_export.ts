export const SessionExportSchema = gql`
  query GetSessionExport($slug: String, $offset: Int, $limit: Int) {
    SessionExport: SessionExport(slug: $slug, offset: $offset, limit: $limit, pagination: true) {
      id
      type
      name
      url
      size
      uuid
      status
      created_at
    }
    Pagination {
      total
      last_page
    }
  }
`;
