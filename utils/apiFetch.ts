import { defu } from "defu";

export function apiFetch<R>(url: string, options?: any) {
  const { accessToken } = storeToRefs(useAuthStore());
  const $loading = useLoadingStore();
  const $config = useRuntimeConfig();
  const defaults = {
    baseURL: $config.app.apiUrl,
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

  return $fetch<R>(url, params);
}
