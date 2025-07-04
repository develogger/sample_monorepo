export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('vue:error', () => {
    // throw showError({
    //   fatal: true,
    //   message: error.message,
    // });
  });
});
