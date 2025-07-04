<template>
  <div class="max-w-[400px] gap-[40px] flex flex-col mx-auto">
    <TerminalStepHeader
      :title="stepInfo.title"
      :caption="stepInfo.caption"
      :title-class="step === StepEnum.Final ? 'whitespace-nowrap' : ''"
    >
      <template v-if="route.query.step === StepEnum.Final" #icon>
        <ui-Icon name="CheckMarkCircleFill" class="text-text-success !text-[48px]" />
      </template>
    </TerminalStepHeader>
    <TerminalStepService
      v-if="!route.query.step || route.query.step === StepEnum.Service"
      :flag="flag"
      @next="serviceStepHandler"
      @update:model-value="onChangeService"
    />
    <TerminalStepDomain
      v-if="route.query.step === StepEnum.Domain"
      :flag="flag"
      :domain="domain"
      @next="domainStepHandler"
      @preview="navigateToStep()"
      @update:model-value="(e: TerminalFlagEnum) => (domain = e)"
    />
    <TerminalStepName
      v-if="route.query.step === StepEnum.Name && flag === TerminalFlagEnum.Normal"
      :name="name"
      @next="nameStepHandler"
      @preview="navigateToStep(StepEnum.Domain)"
      @update:model-value="(e: string) => (name = e)"
    />
    <TerminalStepMCC
      v-if="route.query.step === StepEnum.MCC && flag === TerminalFlagEnum.Normal"
      :loading="isLoading"
      :mcc="mcc"
      @submit="submit"
      @preview="navigateToStep(flag === TerminalFlagEnum.Normal ? StepEnum.Name : StepEnum.Domain)"
    />
    <TerminalStepFinal v-if="route.query.step === StepEnum.Final" :terminal-id="terminalId" />
  </div>
</template>

<script lang="ts" setup>
import { TerminalFlagEnum } from '@/graphql/graphql';
const { data: user } = useUserIdQuery();
const { terminalAdd } = useTerminalMutation();
const { personalLinkRequest } = usePersonalLinkMutation();
const { mutate, loading, onDone } = terminalAdd();
const {
  mutate: personalLinkMutate,
  loading: personalLinkLoading,
  onDone: personalLinkDone,
} = personalLinkRequest();
enum StepEnum {
  Service = 'service',
  Domain = 'domain',
  Name = 'name',
  MCC = 'mcc',
  Final = 'final',
}
interface SelectValue {
  title: string;
  id: number;
}
const t = useI18n();
const route = useRoute();
const router = useRouter();
const flag = ref<TerminalFlagEnum>(TerminalFlagEnum.Normal);
const step = ref();
const domain = ref('');
const name = ref('');
const mcc = ref<SelectValue>({
  id: 0,
  title: '',
});
const terminalId = ref();
onMounted(() => {
  syncStep();
});
const serviceStepHandler = (data: TerminalFlagEnum) => {
  flag.value = data;
  step.value = StepEnum.Domain;

  return router.push({
    query: {
      step: step.value,
    },
  });
};
const domainStepHandler = (data: string) => {
  domain.value = data;

  if (flag.value === TerminalFlagEnum.Normal) {
    step.value = StepEnum.Name;

    return router.push({
      query: {
        step: step.value,
      },
    });
  }

  personalLinkMutate({ username: domain.value });
};
const nameStepHandler = (data: string) => {
  name.value = data;
  step.value = StepEnum.MCC;

  return router.push({
    query: {
      step: step.value,
    },
  });
};
const submit = (data: SelectValue) => {
  mcc.value.id = data.id;
  mcc.value.title = data.title;
  const variable = {
    mcc_id: mcc.value.id,
    domain: domain.value,
    name: name.value,
    support_phone: user.value?.cell_number,
  };
  mutate(variable);
};
onDone(res => {
  step.value = StepEnum.Final;
  terminalId.value = res?.data?.TerminalAdd?.id;

  return router.push({
    query: {
      step: step.value,
    },
  });
});
personalLinkDone(res => {
  step.value = StepEnum.Final;
  terminalId.value = res?.data?.PersonalLinkRequest?.id;

  return router.push({
    query: {
      step: step.value,
    },
  });
});
const stepInfo = computed(() => {
  switch (route.query.step) {
    case StepEnum.Service:
      return {
        title: t('_terminal.add.service.title'),
        caption: t('_terminal.add.service.caption'),
      };
    case StepEnum.Domain:
      return {
        title:
          flag.value === TerminalFlagEnum.Normal
            ? t('_terminal.add.domain.title')
            : t('_terminal.add.domain.zarinlink_title'),
        caption:
          flag.value === TerminalFlagEnum.Normal
            ? t('_terminal.add.domain.caption')
            : t('_terminal.add.domain.zarinlink_caption'),
      };
    case StepEnum.Name:
      return {
        title: t('_terminal.add.name.title'),
        caption: t('_terminal.add.name.caption'),
      };
    case StepEnum.MCC:
      return {
        title: t('_terminal.add.mcc.title'),
        caption: t('_terminal.add.mcc.caption'),
      };
    case StepEnum.Final:
      return {
        title:
          flag.value === TerminalFlagEnum.Normal
            ? t('_terminal.add.final.title')
            : t('_terminal.add.final.zarinlink_title'),
        caption: t('_terminal.add.final.caption'),
      };
    default:
      return {
        title: t('_terminal.add.service.title'),
        caption: t('_terminal.add.service.caption'),
      };
  }
});
const navigateToStep = (toStep?: StepEnum) => router.push({ query: { step: toStep } });
const syncStep = () => {
  if (route.query.step) {
    navigateToStep();
  }
};
const isLoading = computed(() => loading.value || personalLinkLoading.value);
const onChangeService = (e: TerminalFlagEnum) => {
  if (e !== flag.value) {
    domain.value = '';
  }
  flag.value = e;
};
</script>
<style scoped lang="scss">
:deep(.domain .input__inner__unit),
:deep(.domain .input__inner input) {
  direction: ltr;
}
</style>
