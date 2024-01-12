import { type UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export function useApiFetch<R>(url: string, options: UseFetchOptions<R> = {}) {
  const { accessToken } = storeToRefs(useAuthStore());
  const $loading = useLoadingStore();
  const $config = useRuntimeConfig();

  const defaults: UseFetchOptions<R> = {
    baseURL: $config.app.apiUrl,
    key: url,
    headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
    onRequest() {
      $loading.startLoading();
    },
    onResponse() {
      $loading.stopLoading();
    },
    onResponseError() {
      $loading.stopLoading();
    },
    onRequestError() {
      $loading.stopLoading();
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
