<template>
  <div class="flex justify-between mb-xl">
    <span class="text-heading-600-h2 flex items-center">
      {{ $t('_user.accessToken.personal.title') }}
    </span>
    <ui-Button
      v-if="windowSize >= 400"
      variant="outlined"
      type="neutral"
      :text="$t('_user.accessToken.personal.add')"
      before-icon="Plus"
      @click="toggleModal"
    />
    <ui-Button v-else variant="outlined" type="neutral" icon="Plus" @click="toggleModal" />
  </div>
  <ui-Modal
    v-if="addModal"
    ref="filterRef"
    :text="$t('_user.accessToken.personal.add')"
    close-icon
    header
    width="400px"
    @close="toggleModal"
  >
    <template #body>
      <div v-if="step === addModalEnum.Add">
        <UserBaseConnectedAppsPersonalAdd :loading="loading" />
      </div>
      <div v-if="step === addModalEnum.Sucssess">
        <UserBaseConnectedAppsPersonalAddAlert :personal-token="personalToken" />
      </div>
    </template>
  </ui-Modal>
</template>
<script setup lang="ts">
import { MutationPersonalAccessTokenArgs } from '@/graphql/graphql';
import { useAccessTokenSchema } from '@/composables/accessToken/useAccessTokenSchema';
import {
  addModalEnum,
  useAccessTokenMutation,
} from '@/composables/accessToken/useAccessTokenMutation';

const emit = defineEmits(['add']);
const t = useI18n();
const step = ref();
const personalToken = ref();
const addModal = ref(false);
const { personalAccessToken } = useAccessTokenMutation();
const { windowSize } = useSize();
const { schema } = useAccessTokenSchema();
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: schema,
});
type validateType = 'tokenName';
const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
const {
  mutate: addMutate,
  onDone: addDone,
  loading,
} = personalAccessToken((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const toggleModal = () => {
  addModal.value = !addModal.value;
  step.value = addModalEnum.Add;
};
// const { refetch } = useAccessTokenQuery();
const onSubmit = handleSubmit(values => {
  const variables: MutationPersonalAccessTokenArgs = {
    token_name: values?.tokenName,
  } as MutationPersonalAccessTokenArgs;

  addMutate(variables);
  addDone(res => {
    personalToken.value = res.data.PersonalAccessToken.personal_token;
    step.value = addModalEnum.Sucssess;
    emit('add');
  });
});

provide('toggleModal', toggleModal);
provide('form_submit', onSubmit);
provide('form_errors', errors);
provide('form_meta', meta);
</script>
