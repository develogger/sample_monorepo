import { ApolloError } from '@apollo/client/errors';
import { GraphQLError } from 'graphql';

type validationItem = {
  input: string;
  message: string;
  params: string[];
  rule: string;
};
type validationError = GraphQLError & {
  validation: validationItem[];
};
type generalError = GraphQLError & {
  fa_message: string;
  readable_code: string;
};
export const errorHandler = (
  data: ApolloError,
  validationCb?: (value: undefined | validationError) => void
) => {
  const { $notify } = useNuxtApp();
  if (data?.graphQLErrors?.[0]?.message === 'Unauthorized') {
    $notify({
      isRead: false,
      message: 'مجوز دسترسی به این بخش به شما داده نشده است.',
      type: 'error',
    });

    return;
  }

  if (data?.networkError && 'statusCode' in data.networkError) {
    const statusCode = data.networkError.statusCode;

    if (statusCode === 403) {
      $notify({
        isRead: false,
        message: 'مجوز دسترسی به این بخش به شما داده نشده است.',
        type: 'error',
      });

      return;
    }
  }
  if (data.message) {
    switch (true) {
      case data.message === 'validation':
        if (validationCb) {
          return validationCb(data.graphQLErrors[0] as validationError);
        }

        $notify({
          isRead: false,
          message: data.message,
          type: 'error',
        });
        break;
      case data.message.includes('401'):
        $notify({
          isRead: false,
          message: 'نشست شما منقضی شده است.',
          type: 'error',
        });
        break;
      case data.message.includes('400'):
        $notify({
          isRead: false,
          message: 'درخواست معتبر نیست.',
          type: 'error',
        });
        break;
      case data.message.includes('404'):
        $notify({
          isRead: false,
          message: 'درخواست معتبر نیست.',
          type: 'error',
        });
        break;
      case data.message.includes('500'):
        $notify({
          isRead: false,
          message: 'سرور در دسترس نیست.',
          type: 'error',
        });
        break;
      default:
        if (data.graphQLErrors[0].message !== 'Unauthorized') {
          $notify({
            isRead: false,
            message:
              (data.graphQLErrors[0] as generalError)?.fa_message ??
              (data.graphQLErrors[0] as generalError)?.message,
            type: 'error',
          });
        }
    }
  }
};
