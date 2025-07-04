<template>
  <div dir="rtl">
    <!-- rules -->
    <div v-if="description" class="mb-md flex flex-col gap-2xs">
      <div v-if="accept" class="text-body-400-b3 text-text-soft">
        <Skeleton :loading="loading">
          <span>فرمت های مجاز: </span>
          <span v-for="(i, index) in accept" :key="index">
            {{ replace(i, /[^a-zA-Z0-9]/g, '') }}
            {{ index < Number(accept?.length) - 1 ? ' و ' : '' }}
          </span>
        </Skeleton>
      </div>
      <div v-if="maxSize && description" class="text-body-400-b3 text-text-soft">
        <Skeleton :loading="loading">
          <span>حداکثر سایز فایل: </span>
          <span dir="rtl">{{ round(maxSize / 1024) }}Kb</span>
        </Skeleton>
      </div>
      <div v-if="minSize && description" class="text-body-400-b3 text-text-soft">
        <Skeleton :loading="loading">
          <span>حداقل سایز فایل: </span>
          <span dir="rtl">{{ round(minSize / 1024) }}Kb</span>
        </Skeleton>
      </div>
      <div v-if="maxFiles && description" class="text-body-400-b3 text-text-soft">
        <Skeleton :loading="loading">
          <span>حداکثر {{ maxFiles }} فایل قابل آپلود می‌باشد</span>
        </Skeleton>
      </div>
    </div>
    <div v-if="maxFiles >= uploadedFilesArray.length + 1 || maxFiles === 0">
      <div v-bind="getRootProps() as HTMLAttributes">
        <input v-bind="getInputProps() as HTMLAttributes" />
        <div
          v-if="dnd"
          class="py-2xl px-md border border-border border-dashed rounded-sm"
          :class="[dragStyle, { 'bg-surface-disabled': disabled }]"
          @dragover="onDragOver"
          @dragleave="onDropOver"
        >
          <div class="flex flex-col justify-center items-center">
            <Button
              variant="outlined"
              before-icon="Cloud"
              class="mx-auto"
              text="انتخاب فایل..."
              :disabled="disabled || !!activeFile.url"
              :loading="loading"
            />
            <Skeleton v-if="loading" class="text-center mt-xs" :width="200" />
            <p v-else class="text-body-400-b3 text-text-soft w-fit mt-sm">
              یا فایل‌ را در این قسمت رها کنید
            </p>
          </div>
        </div>
      </div>
      <Button
        v-if="!dnd"
        variant="outlined"
        before-icon="Cloud"
        text="انتخاب فایل..."
        :disabled="disabled || !!activeFile.url"
        @click="open"
      />
    </div>
    <!-- list of active file or uploaded file -->
    <div
      v-if="activeFile.url || uploadedFilesArray.length"
      class="rounded-sm border border-border-divider px-sm"
      :class="maxFiles >= uploadedFilesArray.length + 1 || maxFiles === 0 ? 'mt-md' : ''"
    >
      <!-- active file -->
      <div v-if="activeFile.url" class="flex justify-between items-center my-md">
        <div class="flex gap-md items-center">
          <img
            v-if="activeFile.type === 'image'"
            :src="activeFile.url"
            class="rounded-sm opacity-40 object-cover h-[40px]"
            width="40"
            height="40"
          />
          <div
            v-if="activeFile.type === 'another'"
            class="w-[40px] h-[40px] flex justify-center items-center"
          >
            <Icon name="Clip" class="text-icon opacity-40" />
          </div>
          <span class="text-text max-w-[220px] lg:max-w-[300px] line-clamp-1">{{
            activeFile.name
          }}</span>
        </div>
        <div class="flex gap-2xs">
          <Button
            v-if="uploadError"
            icon="Reload"
            type="tertiary"
            class="w-[40px] h-[40px]"
            @click="emits('onUpload', acceptedFiles, undefined)"
          />
          <Button
            v-if="!uploadError"
            icon="Delete"
            type="tertiary"
            class="w-[40px] h-[40px]"
            @click="cancel"
          />
          <Button
            v-if="uploadError"
            icon="Trash"
            type="tertiary"
            class="w-[40px] h-[40px]"
            :loading="loading"
            @click="resetActiveFile(true)"
          />
        </div>
      </div>
      <div v-if="percent && !uploadError" class="mb-md">
        <ProgressBar size="small" :percent="percent" />
      </div>
      <!-- uploaded files -->
      <div v-if="uploadedFilesArray.length > 0">
        <div
          v-for="(item, index) in uploadedFilesArray"
          :key="index"
          class="flex justify-between items-center my-md"
        >
          <div class="flex gap-md items-center">
            <img
              v-if="includes(item.file[0].type, 'image') && !loading"
              :src="createSourceImage(item.file[0])"
              class="rounded-sm object-cover h-[40px]"
              width="40"
              height="40"
            />
            <Skeleton v-if="loading" class="rounded-sm" :width="40" :height="40" />
            <div
              v-if="!includes(item.file[0].type, 'image')"
              class="w-[40px] h-[40px] flex justify-center items-center"
            >
              <Icon name="Clip" class="text-icon" />
            </div>
            <Skeleton v-if="loading" class="text-center mt-xs" :width="150" />
            <span v-else class="text-text truncate max-w-[60px] lg:max-w-[300px]">{{
              item.file[0].name
            }}</span>
          </div>
          <Button
            icon="Trash"
            type="tertiary"
            class="w-[40px] h-[40px]"
            :loading="loading"
            @click="deleteFileFromUploaded(item)"
          />
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="flex gap-2xs mt-md">
      <Icon name="Warning" class="text-icon-danger w-xl h-xl" />
      <span class="text-body-400-b3 text-text-danger flex items-center">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDropzone, type FileRejectReason } from 'vue3-dropzone';
import includes from 'lodash/includes';
import replace from 'lodash/replace';
import round from 'lodash/round';
import { toRefs, toValue, type Ref, reactive, ref, watch, type HTMLAttributes } from 'vue';
import Button from '../button/Button.vue';
import Icon from '../icon/Icon.vue';
import ProgressBar from '../progressBar/ProgressBar.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import { errorHandler } from './useDropzoneHandler';

export interface FileType {
  file: Ref;
  response: Ref;
}
export interface Props {
  loading?: boolean;
  dnd?: boolean;
  accept?: string | string[];
  disabled?: boolean;
  maxSize?: number;
  minSize?: number;
  uploadedFile?: Ref;
  percent?: number;
  uploadError?: boolean;
  maxFiles?: number;
  description?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  accept: undefined,
  minSize: undefined,
  maxSize: undefined,
  uploadedFile: undefined,
  percent: undefined,
  maxFiles: 0,
  description: true,
});
const emits = defineEmits([
  'onUpload',
  'onCancel',
  'onDelete',
  'uploadedFilesList',
  'update:uploadedFile',
]);
const uploadedFilesArray = ref<FileType[]>([]);
const dragStyle = ref<string>();
const {
  accept,
  disabled,
  maxSize,
  minSize,
  uploadedFile,
  percent,
  uploadError,
  maxFiles,
  loading,
} = toRefs(props);
const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
  onDrop,
  accept: accept.value,
  disabled: disabled.value,
  maxSize: maxSize.value || 2e7,
  minSize: minSize.value || 1,
  maxFiles: maxFiles.value,
});
const errorMessage = ref<string>();
const activeFile = reactive({
  url: '',
  name: '',
  type: '',
});
const resetActiveFile = (deleted?: boolean) => {
  activeFile.url = '';
  activeFile.name = '';
  errorMessage.value = '';
  if (deleted) {
    emits('update:uploadedFile', undefined);
  }
};
const createSourceImage = (value: File) => URL.createObjectURL(value as never);
const onDragOver = () => {
  dragStyle.value = 'bg-surface-hover';
};
const onDropOver = () => {
  dragStyle.value = '';
};
function onDrop(acceptFiles: File[], rejectReasons: FileRejectReason[]) {
  if (typeof rejectReasons === 'undefined') {
    errorMessage.value = errorHandler('upload-failed');
  } else {
    errorMessage.value = '';
  }
  if (typeof rejectReasons && rejectReasons.length > 0 && rejectReasons[0].errors[0] !== null) {
    errorMessage.value = errorHandler(
      (rejectReasons[0].errors[0] as { code: string; message: string }).code,
      maxSize.value
    );
  } else {
    errorMessage.value = '';
  }
  if (maxFiles.value < uploadedFilesArray.value.length + 1) {
    errorMessage.value = errorHandler('max-files');
  } else if (!rejectReasons.length) {
    errorMessage.value = '';
  }
  if (
    rejectReasons?.length === 0 &&
    typeof rejectReasons !== 'undefined' &&
    (maxFiles.value >= uploadedFilesArray.value.length + 1 || maxFiles.value === 0)
  ) {
    errorMessage.value = '';
    if (includes(acceptFiles[0].type, 'image')) {
      activeFile.type = 'image';
      activeFile.url = URL.createObjectURL(acceptFiles[0]);
      activeFile.name = acceptFiles[0].name;
    } else {
      activeFile.type = 'another';
      activeFile.name = acceptFiles[0].name;
      activeFile.url = 'Clip';
    }
    emits('onUpload', acceptFiles, rejectReasons);
  }
  if (typeof rejectReasons === 'undefined') {
    emits('onUpload', acceptFiles, rejectReasons);
  }
}
const deleteFileFromUploaded = (item: FileType) => {
  const filterValues = uploadedFilesArray.value.filter(i => toValue(i) !== toValue(item));
  uploadedFilesArray.value = filterValues;
  emits('uploadedFilesList', uploadedFilesArray.value);
  emits('onDelete', uploadedFilesArray.value);
  emits('update:uploadedFile', undefined);
};
const cancel = () => {
  emits('onCancel');
  emits('update:uploadedFile', undefined);
  resetActiveFile();
};

watch(uploadedFile, () => {
  if (typeof uploadedFile.value !== 'undefined') {
    uploadedFilesArray.value.push({ response: uploadedFile.value, file: acceptedFiles.value });
    emits('uploadedFilesList', uploadedFilesArray.value);

    resetActiveFile();
  }
});

watch(uploadError, () => {
  if (uploadError.value) {
    errorMessage.value = errorHandler('upload-failed');
  } else {
    errorMessage.value = '';
  }
});

// TODO: add multiple , dropzone space
</script>
