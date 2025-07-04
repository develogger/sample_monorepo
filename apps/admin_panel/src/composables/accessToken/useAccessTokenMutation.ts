import { PersonalAccessTokenMutationSchema } from '@/services/gql/access_token';

const mutateAccessTokenRemove = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    AccessTokenRemoveMutationSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutatePersonalAccessToken = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    PersonalAccessTokenMutationSchema
  );

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};

export const useAccessTokenMutation = () => {
  const accessTokenRemove = mutateAccessTokenRemove;
  const personalAccessToken = mutatePersonalAccessToken;

  return {
    accessTokenRemove,
    personalAccessToken,
  };
};
export enum addModalEnum {
  Add = 'ADD',
  Sucssess = 'SUCSSESS',
}
