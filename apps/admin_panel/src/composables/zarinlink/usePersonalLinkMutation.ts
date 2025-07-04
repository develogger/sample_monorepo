import { i18n } from '@/locale/i18n';
import { PersonalLinkRequestMutationSchema } from '@/services/gql/personal_link';

const mutatePersonalLinkRequest = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    PersonalLinkRequestMutationSchema
  );
  onError(error => {
    const { $notify } = useNuxtApp();
    const { t } = i18n.global;

    errorHandler(error, value => {
      value?.validation.forEach(element => {
        $notify({
          isRead: false,
          message: t('_validation.' + element.rule, {
            _field_: t(`_validation.name.${element.input}`),
            name: t(`_validation.name.select_${element.input}`),
          }),
          type: 'error',
        });
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const usePersonalLinkMutation = () => {
  const personalLinkRequest = mutatePersonalLinkRequest;

  return {
    personalLinkRequest,
  };
};
