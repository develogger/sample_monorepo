<template>
  <ui-Stepper :steps="steps" class="py-[40px] mx-auto" />
</template>
<script lang="ts" setup>
enum StepEnum {
  Service = 'service',
  Domain = 'domain',
  Name = 'name',
  MCC = 'mcc',
  Final = 'final',
}
const t = useI18n();
const route = useRoute();
const stepStatus = computed(() => {
  const steps = {
    service: 'current',
    info: 'inactive',
    submit: 'inactive',
  };

  switch (route.query.step) {
    case StepEnum.Service:
      steps.service = 'current';
      steps.info = 'inactive';
      steps.submit = 'inactive';
      break;
    case StepEnum.Domain:
    case StepEnum.Name:
    case StepEnum.MCC:
      steps.service = 'done';
      steps.info = 'current';
      steps.submit = 'inactive';
      break;
    case StepEnum.Final:
      steps.service = 'done';
      steps.info = 'done';
      steps.submit = 'current';
      break;
    default:
      steps.service = 'current';
      steps.info = 'inactive';
      steps.submit = 'inactive';
      break;
  }

  return steps;
});
const steps = computed(() => [
  {
    status: stepStatus.value.service,
    text: t('_terminal.add.header.service'),
  },
  {
    status: stepStatus.value.info,
    text: t('_terminal.add.header.info'),
  },
  {
    status: stepStatus.value.submit,
    text: t('_terminal.add.header.submit'),
  },
]);
</script>
