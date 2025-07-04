export const FaqSchema = gql`
  query GetFaq($slug: String) {
    Faqs(slug: $slug) {
      id
      slug
      question
      answer
    }
  }
`;
