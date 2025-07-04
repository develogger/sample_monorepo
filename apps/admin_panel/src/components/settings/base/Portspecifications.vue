<template>
  <div class="mb-xl text-heading-600-h2 text-text" dir="rtl">
    {{ $t('_common.slug.port_specifications') }}
  </div>
  <div class="flex justify-between gap-md">
    <div>
      <ui-Button
        v-if="loading || loadingTerminal"
        :icon="activeTerminal?.pin ? 'PinFill' : 'Pin'"
        type="tertiary"
        :loading="loadingPin || loadingTerminal"
        :disabled="loadingPin || loadingTerminal"
        :class="{ pin__color: activeTerminal?.pin }"
        @click="pinTerminalHandler"
      />
      <ui-Tooltip v-else :content="pinTooltipText" position="top">
        <ui-Button
          :icon="activeTerminal?.pin ? 'PinFill' : 'Pin'"
          type="tertiary"
          :loading="loadingPin || loadingTerminal"
          :disabled="loadingPin || loadingTerminal"
          :class="{ pin__color: activeTerminal?.pin }"
          @click="pinTerminalHandler"
        />
      </ui-Tooltip>
    </div>
    <ui-FloatButton
      class="upload-logo"
      :icon="activeTerminal?.have_logo ? 'PenEdit' : 'Plus'"
      :loading="loading || loadingEdit || loadingTerminal"
      :disabled="!canUploadLogo"
      @click="chooseFiles()"
    >
      <template #default>
        <div class="w-4xl h-4xl flex items-center justify-center">
          <input
            ref="fileUpload"
            type="file"
            accept="image/png"
            hidden
            :disabled="!canUploadLogo"
            @change="getFile"
          />
          <SharedTerminalLogo
            :logo="activeTerminal?.have_logo ? activeTerminal?.logo : undefined"
            size="large"
          />
        </div>
      </template>
    </ui-FloatButton>
  </div>
  <div v-if="fileError" class="my-xs pr-xs font-normal text-body-400-b3 font-yekanFa" dir="rtl">
    <div class="text-text-danger">
      <ui-Icon name="InfoFill" class="align-middle" />
      {{ fileError }}
    </div>
  </div>
  <div
    class="mt-xl divide-y divide-border-divider border border-border-divider rounded-sm"
    dir="rtl"
  >
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">
        {{ $t('_form.settings.terminal_title') }}
      </div>
      <div class="lg:w-1/2 truncate">
        {{ activeTerminal?.name }}
      </div>
    </div>
    <div class="p-md flex flex-col md:flex-row justify-end">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">
        {{ $t('_common.slug.site') }}
      </div>
      <div class="lg:w-1/2 truncate">
        {{ activeTerminal?.domain }}
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 text-text-soft text-body-400-b3 font-medium">
        {{ $t('_common.table.status') }}
      </div>
      <div class="w-1/2">
        <ui-Status
          :text="statusHandler(activeTerminal?.status).text"
          :type="statusHandler(activeTerminal?.status).type"
        />
      </div>
    </div>
  </div>
  <div v-if="activeTerminal?.key" class="mt-xl flex flex-col gap-sm" dir="rtl">
    <div class="text-text-soft text-body-400-b3 font-medium">
      {{ $t('_common.slug.payment_code') }}
    </div>
    <div>
      <ui-ClipBoard :content="activeTerminal?.key" />
    </div>
  </div>
  <template v-if="flag === TerminalFlagEnum.Normal">
    <ui-Divider class="my-xl" />
    <div class="mt-xl flex flex-col gap-sm" dir="rtl">
      <div class="text-text-soft text-body-400-b3 font-medium">
        {{ $t('_common.slug.helper_terminal') }}
      </div>
      <div class="flex justify-between gap-md flex-col md:flex-row">
        <NuxtLink :to="config.public.docs_url" target="_blank" class="w-full">
          <div
            class="flex p-sm border border-border-divider rounded-md flex-col cursor-pointer w-full"
          >
            <div class="flex justify-between w-full">
              <ui-Icon name="Website" />
              <ui-Icon name="ArrowTopLeft" />
            </div>
            <div class="mt-md text-text text-body-400-b2 font-medium">
              {{ $t('_common.slug.implement_docs') }}
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          :to="`${config.public.zarin_url}lab/%D9%86%D9%85%D9%88%D9%86%D9%87-%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA-%D8%AF%D8%B1%D9%88%D9%86-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-ios-%D8%A7%D8%B3%D8%A7%D8%B3-sdk-%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7/`"
          target="_blank"
          class="w-full"
        >
          <div
            class="flex p-sm w-full border border-border-divider rounded-md flex-col cursor-pointer"
          >
            <div class="flex justify-between w-full">
              <ui-Icon name="MobileSettings" />
              <ui-Icon name="ArrowTopLeft" />
            </div>
            <div class="mt-md text-text text-body-400-b2 font-medium">
              {{ $t('_common.slug.implement_app') }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { useTerminalStatus } from '@/composables/terminal/useTerminalStatus';
import { TerminalFlagEnum, TerminalStatusEnum } from '@/graphql/graphql';
const { $notify } = useNuxtApp();
const t = useI18n();
const store = useTerminalStore();
const { statusHandler } = useTerminalStatus();
const { activeTerminal, refetch, loading: loadingTerminal, onResult } = useTerminalQuery();
const { uploadFile, uploadedFile } = useUpload();
const { terminalEdit, pinTerminal } = useTerminalMutation();
const { snakeToCamel } = useSnakeToCamel();
const { setFieldError } = useForm({
  validationSchema: null,
});
const fileError = ref();
type validateType = '';
const {
  mutate,
  onDone,
  loading: loadingEdit,
} = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const { mutate: mutatePin, onDone: onDonePin, loading: loadingPin } = pinTerminal();
const logoUrl = ref<string>();
const config = useRuntimeConfig();
const fileUpload = ref<HTMLInputElement>();
const loading = ref(false);
const existImage = () => {
  logoUrl.value = `${activeTerminal.value?.logo}/64x64.png?v=${store.logoVersion}`;
};
const chooseFiles = () => {
  fileUpload.value?.click();
};
const isValidLogo = async (file: File) => {
  fileError.value = '';
  if (file.type !== 'image/png') {
    fileError.value = t('_validation.file_type', {
      type: 'png',
    });

    return false;
  }
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    fileError.value = t('_validation.size', {
      _field_: t('_terminal.logo'),
      size: '2',
      unit: 'MB',
    });

    return false;
  }

  const checkImageDimensions = () =>
    new Promise<boolean>(resolve => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 500 || img.height !== 500) {
            fileError.value = t('_validation.dimensions_symmetric', {
              _field_: t('_terminal.logo'),
              width: '500',
              height: '500',
            });
            resolve(false);
          } else {
            resolve(true);
          }
        };
        img.src = e?.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  const isValid = await checkImageDimensions();

  return isValid;
};
const getFile = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files as unknown as File[];
  if (!file.length) {
    return;
  }

  const isValid = await isValidLogo(file[0]);
  if (!isValid) {
    return;
  }
  loading.value = true;
  await uploadFile(file);
  loading.value = false;
  if (!('meta' in uploadedFile.value!) || !uploadedFile.value?.meta?.file_id) {
    $notify({
      isRead: false,
      message: t('_common.upload_error', {
        _field_: t('_terminal.logo'),
      }),
      type: 'error',
    });

    return;
  }

  mutate({
    id: activeTerminal.value?.id,
    bank_account_id: activeTerminal.value?.preferred_bank_account_id,
    logo: uploadedFile.value?.meta.file_id,
  });
};
onDone(async response => {
  store.currentLogo = response?.data.TerminalEdit?.logo;
  store.logoVersion = new Date().getTime();
  await refetch();
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
onMounted(() => {
  existImage();
});
onResult(() => {
  existImage();
});
const pinTerminalHandler = () => {
  if (activeTerminal.value && activeTerminal.value?.pin) {
    mutatePin({
      id: store.currentTerminal,
      pin: false,
    });
  } else {
    mutatePin({
      id: store.currentTerminal,
      pin: true,
    });
  }
};
onDonePin(async () => {
  await refetch();
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
const pinTooltipText = computed(() => {
  if (activeTerminal.value?.pin) {
    return t('common.cancelPinTooltip');
  }

  return t('common.pinTooltip');
});
const flag = computed(() => activeTerminal.value?.flag);
const canUploadLogo = computed(() => activeTerminal.value?.status === TerminalStatusEnum.Active);
</script>

<style lang="scss">
.pin__color {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
}
.upload-logo button i {
  @apply text-heading-600-h3 w-full flex items-center justify-center;
}
</style>
