<template>
  <div class="flex flex-col gap-md">
    <ui-TextField
      v-model="domain"
      :placeholder="domainPlaceholder"
      :unit="domainPrefix"
      :label="false"
      class="w-full domain"
      name="domain"
      :helper="{
        type: !!errors?.domain ? 'error' : undefined,
        message: errors?.domain,
      }"
      @update:model-value="(e: string) => $emit('update:modelValue', e)"
    />
  </div>
  <div class="flex flex-col gap-sm">
    <ui-Button
      :text="$t('_common.buttons.confirm_and_continue')"
      :disabled="!meta.valid || loading"
      :loading="loading"
      size="large"
      @click.stop="submit"
    />
    <ui-Button
      :text="$t('_common.buttons.return')"
      type="tertiary"
      size="large"
      @click="$emit('preview')"
    />
  </div>
</template>
<script lang="ts" setup>
import { useDomainSchema } from '@/composables/terminal/useTerminalSchema';
import { TerminalFlagEnum } from '@/graphql/graphql';
const t = useI18n();
const emit = defineEmits(['next', 'preview', 'update:modelValue']);
interface Props {
  flag: TerminalFlagEnum;
  domain: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { flag, domain } = toRefs(props);
const { schema } = useDomainSchema();
const { schema: usernameSchema } = useUsernameSchema();
const { snakeToCamel } = useSnakeToCamel();
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: flag.value === TerminalFlagEnum.Normal ? schema : usernameSchema,
});
type validateType = 'domain';
const temp = ref('');
const { loading, refetch, load, onResult } = useDomainCheckQuery(
  { domain: temp },
  (input, rule, params) => {
    setFieldError(
      snakeToCamel(input) as validateType,
      t('_validation.' + rule, { _field_: t(`_validation.name.${params}`) })
    );
  }
);
const domainPrefix = computed(() =>
  flag.value === TerminalFlagEnum.Normal ? 'https://' : 'zarinp.al/'
);
const domainPlaceholder = computed(() =>
  flag.value === TerminalFlagEnum.Normal ? 'mywebsite.com' : 'myzarinlink'
);
const submit = handleSubmit(() => {
  temp.value = flag.value === TerminalFlagEnum.Normal ? domain.value : `zarinp.al/${domain.value}`;
  (typeof load === 'function' && load()) || refetch({ domain: temp.value });
});
onResult(() => {
  emit('next', domain.value);
});
</script>
