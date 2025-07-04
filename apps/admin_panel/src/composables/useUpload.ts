import axios, { AxiosError } from 'axios';

export interface Response {
  meta: {
    file_id: string;
  };
}

/**
 * upload attachment
 * @param value html input file
 */

export const useUpload = (withUpload = true) => {
  const uploadError = ref<boolean>();
  const percentUpload = ref<number>(0);
  const uploadedFile = ref<File | Response>();
  const config = useRuntimeConfig();
  let cancelTokenSource = axios.CancelToken.source();
  const uploadFile = async (value: File[]) => {
    if (!withUpload) {
      uploadedFile.value = value[0];
      percentUpload.value = 0;

      return;
    }
    uploadError.value = false;
    try {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Previous request canceled');
      }
      cancelTokenSource = axios.CancelToken.source();
      const formData = new FormData();
      formData.append('file', value[0], value[0].name);
      formData.append('type', 'document');
      const response = await axios.post(config.public.upload_url as string, formData, {
        cancelToken: cancelTokenSource.token,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / Number(progressEvent.total));
          percentUpload.value = progress;
        },
      });
      uploadedFile.value = response.data;
      percentUpload.value = 0;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        if (axiosError.code !== 'ERR_CANCELED') {
          uploadError.value = true;
        } else {
          uploadedFile.value = undefined;
        }
      }
    }
  };
  const handleUploadCancel = () => {
    cancelTokenSource.cancel('Operation canceled by the user');
  };

  return { handleUploadCancel, percentUpload, uploadError, uploadFile, uploadedFile };
};
