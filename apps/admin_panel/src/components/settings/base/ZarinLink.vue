<template>
  <div class="flex flex-col h-full space-y-2xl rtl">
    <ui-skeleton
      :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
      :width="200"
      :height="33"
      radius="xl"
    >
      <span class="text-heading-600-h2">
        {{ $t('_common.links.zarin_link') }}
      </span>
    </ui-skeleton>

    <div class="space-y-xl">
      <ui-skeleton
        :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
        full-width
        :height="40"
      >
        <ui-Tab v-model="tab" has-border :items="tabs" align="start" class="-mx-md px-2xs -mt-md" />
      </ui-skeleton>

      <div v-if="tab === '1'" class="space-y-xl">
        <div class="space-y-xs">
          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="60"
          >
            <span class="text-body-400-b2 font-500">
              {{ $t('_zarin_link.setting.branding.default_colors') }}
            </span>
          </ui-skeleton>

          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="400"
          >
            <p class="font-normal text-body-400-b3 text-text-soft">
              {{ $t('_zarin_link.setting.branding.default_colors_description') }}
            </p>
          </ui-skeleton>
        </div>

        <div class="space-y-md">
          <div class="flex items-center space-x-md space-x-reverse">
            <ui-skeleton
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :height="20"
              :width="50"
            >
              <p class="font-normal text-body-400-b3 text-text-soft w-[55px]">
                {{ $t('_zarin_link.setting.branding.primary_color') }}
              </p>
            </ui-skeleton>

            <ui-skeleton
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :height="50"
              :width="50"
              circle
            >
              <Tippy
                ref="primaryColorTippyRef"
                :arrow="false"
                interactive
                placement="bottom"
                trigger="click"
              >
                <template #content>
                  <SettingsBaseZarinLinkPrimaryColorDropdownBox />
                </template>
                <div
                  class="w-[40px] h-[40px] border border-border p-2xs rounded-circle cursor-pointer"
                >
                  <div
                    class="w-full h-full rounded-circle"
                    :style="{ 'background-color': primaryColorSelected }"
                  ></div>
                </div>
              </Tippy>
            </ui-skeleton>
          </div>

          <div class="flex items-center space-x-md space-x-reverse">
            <ui-skeleton
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :height="20"
              :width="50"
            >
              <p class="font-normal text-body-400-b3 text-text-soft w-[55px]">
                {{ $t('_zarin_link.setting.branding.secondary_color') }}
              </p>
            </ui-skeleton>

            <ui-skeleton
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :height="50"
              :width="50"
              circle
            >
              <Tippy
                ref="secondaryColorTippyRef"
                :arrow="false"
                interactive
                placement="bottom-start"
                trigger="click"
              >
                <template #content>
                  <SettingsBaseZarinLinkSecondaryColorDropdownBox />
                </template>
                <div
                  class="w-[40px] h-[40px] border border-border p-2xs rounded-circle cursor-pointer"
                >
                  <div
                    class="w-full h-full rounded-circle"
                    :style="{ 'background-color': secondaryColorSelected }"
                  ></div>
                </div>
              </Tippy>
            </ui-skeleton>
          </div>
        </div>

        <ui-Divider class="w-full" />

        <div class="space-y-xs">
          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="50"
          >
            <span class="text-body-400-b2 font-500">
              {{ $t('_zarin_link.setting.branding.profile') }}
            </span>
          </ui-skeleton>

          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="300"
          >
            <p class="font-normal text-body-400-b3 text-text-soft">
              {{ $t('_zarin_link.setting.branding.profile_description') }}
            </p>
          </ui-skeleton>
        </div>

        <div class="ltr flex-col flex">
          <ui-Textarea
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            class="w-full float-right"
            :max-length="150"
            name="bio"
            :placeholder="$t('_zarin_link.setting.branding.introduction')"
            :helper="{
              type: errors?.bio ? 'error' : 'info',
              message: errors?.bio || $t('_zarin_link.setting.branding.introduction_description'),
            }"
          />
        </div>

        <div class="space-y-md">
          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="50"
          >
            <p class="text-body-400-b3 text-text-soft font-400 mt-md">
              {{ $t('_zarin_link.setting.branding.contacts') }}
            </p>
          </ui-skeleton>

          <div class="space-y-sm">
            <ui-Switch
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :checked="isShowMobileInput"
              name="phoneSwitch"
              :label="$t('_zarin_link.setting.branding.mobile')"
              class="ltr flex justify-end"
              @change="toggleShowMobileInput"
            />
            <ui-TextField
              v-show="isShowMobileInput"
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              class="w-full lg:w-1/2 ltr"
              name="phone"
              :max-length="11"
              :show-max-length-limit="false"
              :placeholder="$t('_zarin_link.setting.branding.mobile')"
              :helper="{
                type: !!errors.phone ? 'error' : undefined,
                message: errors.phone,
              }"
            />
          </div>

          <div class="space-y-sm">
            <ui-Switch
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :checked="isShowEmailInput"
              :label="$t('_zarin_link.setting.branding.email')"
              class="ltr flex justify-end"
              name="emailSwitch"
              @change="toggleShowEmailInput"
            />
            <ui-TextField
              v-show="isShowEmailInput"
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              class="w-full lg:w-1/2 ltr"
              name="email"
              :placeholder="$t('_zarin_link.setting.branding.email')"
              :helper="{
                type: !!errors.email ? 'error' : undefined,
                message: errors.email,
              }"
            />
          </div>

          <div class="space-y-sm">
            <ui-Switch
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :checked="isShowAddressInput"
              name="addressSwitch"
              :label="$t('_zarin_link.setting.branding.address')"
              class="ltr flex justify-end"
              @change="toggleShowAddressInput"
            />
            <ui-Textarea
              v-show="isShowAddressInput"
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              class="w-full lg:w-1/2 ltr"
              name="address"
              :max-length="200"
              :show-max-length-limit="false"
              :placeholder="$t('_zarin_link.setting.branding.address')"
              :helper="{
                type: !!errors.address ? 'error' : undefined,
                message: errors.address,
              }"
            />
          </div>
        </div>

        <div class="space-y-md flex flex-col">
          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="20"
            :width="50"
          >
            <span class="text-body-400-b3 text-text-soft font-400">
              {{ $t('_zarin_link.setting.branding.social_medias') }}
            </span>
          </ui-skeleton>

          <div
            v-for="(item, index) in socialMediaRows"
            :key="item.id"
            class="flex items-start w-full flex-row-reverse mb-sm ltr space-x-md space-x-reverse"
          >
            <ui-Select
              :value="
                item.id.includes('-') ? undefined : socialMedias.find(el => el.id === item.id)
              "
              :data="socialMedias"
              class="w-full max-w-[164px]"
              after-icon="AngleDown"
              :name="`social_type_${item.id.includes('-') ? index : item.id}`"
              :placeholder="$t('_zarin_link.setting.branding.label')"
              :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              @selected-item="
                (event: SocialMediaRow) => {
                  if (!event.id) {
                    return;
                  }
                  item.key = event.id;
                  item.id = event.id;
                  if (data?.contacts?.socials?.[event.id as keyof SocialType] === null) {
                    updated = false;
                  }
                }
              "
            />
            <ui-TextField
              v-model="item.value"
              class="w-full"
              :name="`social_link_${index}`"
              :placeholder="$t('_zarin_link.setting.branding.social_media_link')"
              :helper="{
                type: !!errors?.[`social_link_${index}`] ? 'error' : undefined,
                message: errors?.[`social_link_${index}`],
              }"
              :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
              @update:model-value="
                () => {
                  updated = false;
                }
              "
            />

            <div class="justify-end flex items-center">
              <ui-Button
                class="md:!p-xs !p-0"
                icon="Trash"
                type="tertiary"
                :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
                :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
                @click="removeRow(index)"
              />
            </div>
          </div>

          <ui-skeleton
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :height="40"
            :width="200"
          >
            <ui-Button
              v-if="!hideAddRow"
              class="mb-sm w-fit border border-border"
              before-icon="Plus"
              type="tertiary"
              :text="$t('_zarin_link.setting.branding.add_account')"
              :disabled="!canAddRow"
              @click="addRow"
            />
          </ui-skeleton>
        </div>

        <div class="flex gap-xs justify-end">
          <ui-Button
            v-if="!(updated && isFormDirty)"
            :text="$t('_common.buttons.cancel')"
            type="secondary"
            :disabled="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            @click="reset"
          />
          <ui-Button
            html-type="submit"
            :text="t('_common.buttons.save')"
            :disabled="disableButton"
            :loading="zarinLinkSettingBrandingLoading || mutateZarinLinkSettingBrandingLoading"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import { SettingsBaseZarinLinkColorDropdown } from '#components';
import { useZarinLinkSettingBrandingSchema } from '~/composables/zarinlink/settings/useZarinLinkSettingBrandingSchema';
import { useTerminalStore } from '~/stores/terminalStore';
import { SocialType, TerminalBrandingSettingType } from '~/graphql/graphql';

// types
interface SocialMediaRow {
  id: string;
  key: string;
  value: string;
}
interface SocialLinks {
  [key: string]: string | undefined;
}

// constant
const defaultPrimaryColor = '#2d3040';
const defaultSecondaryColor = '#0a33ff';
const isFormDirty = ref();
const updated = ref(false);
const mutedResponse = ref();
// form initialization
const { schema } = useZarinLinkSettingBrandingSchema();
const {
  errors,
  handleSubmit,
  meta,
  setValues,
  values: formValues,
  setErrors,
  setFieldError,
} = useForm<{
  bio?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
}>({
  validationSchema: schema,
});
// api
const { loading: zarinLinkSettingBrandingLoading, data } = getZarinLinkSettingBranding();
const {
  mutate,
  loading: mutateZarinLinkSettingBrandingLoading,
  onDone,
} = updateZarinLinkSettingBrandingMutation(handleValidationErrors);
function handleValidationErrors(input: string, message: string) {
  if (input.includes('.')) {
    const extractInput = input.split('.');
    setFieldError(extractInput[extractInput.length - 1] as string, message);
  } else {
    setFieldError(input as string, message);
  }
}
const terminal = useTerminalStore();
const t = useI18n();
const tabs = [
  {
    label: t('_zarin_link.setting.tabs.branding'),
    value: '1',
  },
];
const { $notify } = useNuxtApp();
const tab = ref('1');
const socialMedias = [
  {
    title: t('_zarin_link.setting.branding.social_media_types.instagram'),
    id: 'instagram',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.telegram'),
    id: 'telegram',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.linkedin'),
    id: 'linkedin',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.twitter'),
    id: 'twitter',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.facebook'),
    id: 'facebook',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.whatsapp'),
    id: 'whatsapp',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.eata'),
    id: 'eata',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.aparat'),
    id: 'aparat',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.youtube'),
    id: 'youtube',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.github'),
    id: 'github',
  },
  {
    title: t('_zarin_link.setting.branding.social_media_types.discord'),
    id: 'discord',
  },
];
// social medias
const socialMediaRows = ref<SocialMediaRow[]>([]);
const canAddRow = ref(true);
const hideAddRow = computed(() => socialMediaRows.value.length === 5);
function removeRow(index: number) {
  socialMediaRows.value.splice(index, 1);
  updated.value = false;
}
function addRow() {
  const newRow: SocialMediaRow = {
    id: `${Date.now()}-${Math.random()}`,
    key: '',
    value: '',
  };
  socialMediaRows.value.push(newRow);
  updated.value = false;
}
watchEffect(() => {
  const lastRow = socialMediaRows.value[socialMediaRows.value.length - 1];
  const key = lastRow?.key;
  const value = lastRow?.value?.trim();

  canAddRow.value =
    socialMediaRows.value.length === 0
      ? true
      : key?.length >= 1 && key?.length <= 30 && value?.length >= 1 && value?.length <= 100;
});

// colors
const primaryColorSelected = ref<string>(defaultPrimaryColor);
const primaryColorTippyRef = ref<typeof Tippy>();
const secondaryColorSelected = ref<string>(defaultSecondaryColor);
const secondaryColorTippyRef = ref<typeof Tippy>();
const onPrimaryColorSelectedHandler = (color: string, isPicking = true) => {
  primaryColorSelected.value = color;
  isPicking &&
    primaryColorTippyRef.value?.state &&
    primaryColorTippyRef.value?.state.isShown &&
    primaryColorTippyRef.value?.hide();
};
const onSecondaryColorSelectedHandler = (color: string, isPicking = true) => {
  secondaryColorSelected.value = color;
  isPicking &&
    secondaryColorTippyRef.value?.state &&
    secondaryColorTippyRef.value?.state.isShown &&
    secondaryColorTippyRef.value?.hide();
};
const SettingsBaseZarinLinkPrimaryColorDropdownBox = computed(() =>
  h(SettingsBaseZarinLinkColorDropdown, {
    onColorSelected: onPrimaryColorSelectedHandler,
    selectedColor: primaryColorSelected.value,
  })
);
const SettingsBaseZarinLinkSecondaryColorDropdownBox = computed(() =>
  h(SettingsBaseZarinLinkColorDropdown, {
    onColorSelected: onSecondaryColorSelectedHandler,
    selectedColor: secondaryColorSelected.value,
  })
);
// contacts
const isShowMobileInput = ref<boolean>(false);
const isShowEmailInput = ref<boolean>(false);
const isShowAddressInput = ref<boolean>(false);
const toggleShowMobileInput = (event: Event) => {
  isShowMobileInput.value = (event.target as HTMLInputElement).checked;
};
const toggleShowEmailInput = (event: Event) => {
  isShowEmailInput.value = (event.target as HTMLInputElement).checked;
};
const toggleShowAddressInput = (event: Event) => {
  isShowAddressInput.value = (event.target as HTMLInputElement).checked;
};
// form changes
const initialFormValues = reactive({
  email: '',
  bio: '',
  address: '',
  phone: '',
  addressSwitch: false,
  phoneSwitch: false,
  emailSwitch: false,
  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
});
const { value: emailValue } = useField('email');
const { value: bioValue } = useField('bio');
const { value: phoneValue } = useField('phone');
const { value: addressValue } = useField('address');
const { value: addressSwitchValue } = useField('addressSwitch');
const { value: phoneSwitchValue } = useField('phoneSwitch');
const { value: emailSwitchValue } = useField('emailSwitch');
const currentFormValues = computed(() => ({
  email: emailValue.value || '',
  bio: bioValue.value || '',
  address: addressValue.value || '',
  phone: phoneValue.value || '',
  addressSwitch: !!addressSwitchValue.value,
  phoneSwitch: !!phoneSwitchValue.value,
  emailSwitch: !!emailSwitchValue.value,
  primaryColor: primaryColorSelected.value,
  secondaryColor: secondaryColorSelected.value,
}));
const checkIfFormIsDirty = computed(() => {
  if (currentFormValues.value && data.value) {
    isFormDirty.value = !Object.keys(initialFormValues).some(key => {
      const currentValues = currentFormValues.value[key as keyof typeof currentFormValues.value];
      const initialValues = initialFormValues[key as keyof typeof initialFormValues];
      const isSwitchKey = key.toLowerCase().includes('switch');
      const isBioKey = key.toLowerCase().includes('bio');
      const bioCurrentValue = currentValues === '' || !!currentValues;

      return (
        (isSwitchKey ? currentValues === false : isBioKey ? bioCurrentValue : currentValues) &&
        initialValues !== currentValues
      );
    });
  }

  return isFormDirty.value;
});
onUnmounted(() => {
  updated.value = false;
});
watch(checkIfFormIsDirty, () => {
  updated.value = checkIfFormIsDirty.value;
});
watch(phoneSwitchValue, newValue => {
  if (newValue === false) {
    currentFormValues.value.phone = '';
    setValues({ phone: '' }, false);
  }
});

watch(emailSwitchValue, newValue => {
  if (newValue === false) {
    currentFormValues.value.email = '';
    setValues({ email: '' }, false);
  }
});

watch(addressSwitchValue, newValue => {
  if (newValue === false) {
    currentFormValues.value.address = '';
    setValues({ address: '' }, false);
  }
});
// buttons
const disableButton = computed(
  () =>
    !formValues?.isSpecTableValid ||
    !meta.value?.valid ||
    zarinLinkSettingBrandingLoading.value ||
    mutateZarinLinkSettingBrandingLoading.value ||
    (updated.value && isFormDirty.value)
);
const reset = () => {
  setFormValues((mutedResponse.value || data.value) as TerminalBrandingSettingType);
  updated.value = true;
  isFormDirty.value = true;
  setErrors({ bio: '', address: '', email: '', phone: '' });
};
const onSubmit = handleSubmit(async formValues => {
  const socialMedias: SocialLinks = socialMediaRows.value.reduce((acc, item) => {
    if (item.key && item.value?.trim()) {
      acc[item.key] = item.value.trim();
    }

    return acc;
  }, {} as SocialLinks);
  const payload = {
    terminal_id: terminal.currentTerminal ? +terminal.currentTerminal : 0,
    contacts: {
      socials: socialMediaRows?.value?.length ? socialMedias : undefined,
      email: isShowEmailInput.value ? formValues?.email || undefined : undefined,
      phone: isShowMobileInput.value ? formValues?.phone || undefined : undefined,
      address: isShowAddressInput.value ? formValues?.address || undefined : undefined,
    },
    template: {
      primary_color: primaryColorSelected.value,
      secondary_color: secondaryColorSelected.value,
    },
    bio: formValues?.bio,
  };

  await mutate(payload);

  updated.value = true;
  isFormDirty.value = true;
});
const setFormValues = (zarinLinkData: TerminalBrandingSettingType) => {
  secondaryColorSelected.value = zarinLinkData?.template?.secondary_color
    ? zarinLinkData?.template.secondary_color
    : defaultSecondaryColor;
  primaryColorSelected.value = zarinLinkData?.template?.primary_color
    ? zarinLinkData?.template.primary_color
    : defaultPrimaryColor;

  isShowAddressInput.value = !!zarinLinkData.contacts?.address;
  isShowEmailInput.value = !!zarinLinkData.contacts?.email;
  isShowMobileInput.value = !!zarinLinkData.contacts?.phone;

  socialMediaRows.value = Object.entries(zarinLinkData.contacts?.socials || {})
    .filter(([key, value]) => value !== null && key !== '__typename')
    .map(([key, value]) => ({
      id: key,
      key,
      value: value as string,
    }));
  if (setValues) {
    setValues(
      {
        bio: zarinLinkData.bio || undefined,
        email: zarinLinkData.contacts?.email || undefined,
        phone: zarinLinkData.contacts?.phone || undefined,
        address: zarinLinkData.contacts?.address || undefined,
      },
      false
    );
  }

  initialFormValues.bio = zarinLinkData.bio || '';
  initialFormValues.email = zarinLinkData.contacts?.email || '';
  initialFormValues.emailSwitch = !!zarinLinkData.contacts?.email;
  initialFormValues.address = zarinLinkData.contacts?.address || '';
  initialFormValues.addressSwitch = !!zarinLinkData.contacts?.address;
  initialFormValues.phone = zarinLinkData.contacts?.phone || '';
  initialFormValues.phoneSwitch = !!zarinLinkData.contacts?.phone;
  initialFormValues.primaryColor = zarinLinkData?.template?.primary_color
    ? zarinLinkData?.template.primary_color
    : defaultPrimaryColor;
  initialFormValues.secondaryColor = zarinLinkData?.template?.secondary_color
    ? zarinLinkData?.template.secondary_color
    : defaultSecondaryColor;
  updated.value = true;
};

watch(data, newData => {
  if (newData) {
    setFormValues(newData);
  }
});
watchEffect(() => {
  if (setValues) {
    setValues(
      {
        isSpecTableValid: canAddRow.value === undefined ? false : canAddRow.value,
      },
      false
    );
  }
});
onDone(response => {
  mutedResponse.value = response?.data?.TerminalSettingBranding;
  setFormValues(mutedResponse.value);
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
</script>
