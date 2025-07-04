export const AddNoteMutationSchema = gql`
  mutation NoteAdd($model_type: NoteModelTypeEnum, $model_id: ID!, $content: String!) {
    NoteAdd(model_type: $model_type, model_id: $model_id, content: $content) {
      id
      content
    }
  }
`;
export const EditNoteMutationSchema = gql`
  mutation NoteEdit($id: ID!, $content: String!) {
    NoteEdit(id: $id, content: $content) {
      id
      content
    }
  }
`;
export const NoteDeleteMutationSchema = gql`
  mutation NoteDelete($id: ID!) {
    NoteDelete(id: $id)
  }
`;
