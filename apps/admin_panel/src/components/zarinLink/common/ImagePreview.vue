<template>
  <div v-if="images?.length" dir="rtl" class="rounded-sm border border-border-divider px-sm">
    <div class="flex justify-between items-center my-md">
      <div class="flex gap-md items-center">
        <div v-if="isMultiple">
          <ui-skeleton
            v-for="(image, index) in images"
            :key="index"
            :loading="mainLoading"
            :height="40"
            :width="40"
          >
            <NuxtImg
              :src="image?.url"
              class="rounded-sm object-cover h-[40px]"
              width="40"
              height="40"
            />
          </ui-skeleton>
        </div>
        <div v-else>
          <ui-skeleton :loading="mainLoading" :height="40" :width="40">
            <NuxtImg
              :src="images[0]?.url"
              class="rounded-sm object-cover h-[40px]"
              width="40"
              height="40"
            />
          </ui-skeleton>
        </div>
        <ui-skeleton :loading="mainLoading">
          <div class="text-text truncate lg:max-w-[250px] max-w-[200px]">
            {{ title }}
          </div>
        </ui-skeleton>
      </div>

      <ui-Button
        v-if="hasDelete"
        :loading="deleteLoading || mainLoading"
        icon="Trash"
        type="tertiary"
        class="w-[40px] h-[40px]"
        @click="deleteFile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Maybe } from 'graphql/jsutils/Maybe';
import { FileType, Scalars } from '~/graphql/graphql';

interface Props {
  images: Maybe<Array<Maybe<FileType>>>;
  title: Maybe<Scalars['String']['output']>;
  hasDelete?: boolean;
  mainLoading: boolean;
  deleteLoading: boolean;
  deleteFile: () => void;
  isMultiple?: boolean;
}
withDefaults(defineProps<Props>(), {
  hasDelete: true,
  isMultiple: false,
});
</script>
