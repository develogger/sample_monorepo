// eslint-disable-next-line promise/param-names
export const useDelay = (ms: number) => new Promise(res => setTimeout(res, ms));
