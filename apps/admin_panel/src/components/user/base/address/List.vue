<template dir="rtl">
  <div>
    <div class="flex justify-between mb-xl">
      <span class="text-heading-600-h2">
        {{ $t('_address.title') }}
      </span>
      <ui-Button
        before-icon="Plus"
        variant="outlined"
        type="neutral"
        :text="$t('_address.add_new')"
        @click.stop="toggleModal"
      />
    </div>
    <userBaseAddressLoad v-if="loading" />
    <ui-EmptyState
      v-else-if="!loading && !user?.addresses?.length"
      :title="$t('_empty.addressList.title')"
      :description="$t('_empty.addressList.caption')"
      vector="AddressLocation"
    />

    <div v-else class="flex flex-col gap-md">
      <div
        v-for="address in user?.addresses"
        :key="address?.id"
        class="flex flex-col border rounded-sm gap-md p-md border-border-divider dark:border-border-dark-divider"
      >
        <div
          :class="[
            'flex flex-col gap-xs',
            !address?.is_postal_code_verified ? 'text-text-soft dark:text-text-dark-soft' : null,
          ]"
        >
          <span class="text-body-400-b2">
            {{ address?.title ? address.title : $t(`_address.type.${address?.type}`) }}
          </span>
          <p class="text-body-400-b2">{{ address?.address }}</p>
        </div>

        <!-- Postal Code -->
        <div class="flex items-center gap-xs">
          <span class="whitespace-nowrap text-body-400-b3 text-text-soft dark:text-text-dark-soft">
            {{ $t('_address.zip_code') }}
          </span>
          <span class="block h-[1px] w-full border-b border-dashed border-border" />
          <div class="flex items-center gap-2xs">
            <ui-status
              :type="address?.is_postal_code_verified ? 'positive' : 'warning'"
              :text="address?.postal_code"
            />
            <ui-status
              v-if="address?.is_postal_code_verified"
              type="positive"
              icon="CheckMarkCircleFill"
            />
          </div>
        </div>

        <!-- Phone Number -->
        <div class="flex items-center gap-xs">
          <span class="whitespace-nowrap text-body-400-b3 text-text-soft dark:text-text-dark-soft">
            {{ $t('_address.phone_number') }}
          </span>
          <span class="block h-[1px] w-full border-b border-dashed border-border" />
          <div class="flex items-center gap-2xs text-body-400-b3">
            {{ address?.landline }}
          </div>
        </div>
        <div class="flex gap-xs mt-xs">
          <ui-Button
            v-if="showEdit"
            size="medium"
            variant="outlined"
            type="neutral"
            before-icon="PenEdit"
            :text="$t('common.edit')"
            @click="editModal(address?.id)"
          />
        </div>
      </div>
    </div>
    <userBaseAddressAdd
      v-if="addModal"
      :id="uniqId"
      ref="filenameRef"
      :edit="edit"
      :loading="loading"
      :user-address="user"
      @done="onDone"
    />
  </div>
</template>
<script setup lang="ts">
import { useAddressQuery } from '@/composables/address/useAddressQuery';
import { UserLevelEnum } from '@/graphql/graphql';

const t = useI18n();
useHead({
  title: t('_user.address.title'),
});
const { data: user, loading, refetch } = useAddressQuery();
const addModal = ref(false);
const edit = ref(false);
const uniqId = ref<string | undefined>();
const toggleModal = () => {
  addModal.value = !addModal.value;
  uniqId.value = '';
  edit.value = false;
};
const editModal = (id: string | undefined) => {
  uniqId.value = id;
  addModal.value = !addModal.value;
  edit.value = true;
};
const onDone = () => {
  refetch();
  addModal.value = false;
  uniqId.value = '';
  edit.value = false;
};
const showEdit = computed(
  () => user.value?.level === UserLevelEnum.New || user.value?.level === UserLevelEnum.Basic
);
provide('toggleModal', toggleModal);
</script>
