/* eslint-disable */
interface PluginsInjections {
  $notify(data: NotificationType): void;
  $t(msg: string): string;
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}
export {};
