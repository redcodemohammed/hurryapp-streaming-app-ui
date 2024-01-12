export const useApiFetch = () => {
  const { accessToken, refreshToken } = storeToRefs(useAuthStore());
  const $loading = useLoadingStore();
  const $config = useRuntimeConfig();

  function customFetch<R, E>(url: string, options?: any) {
    const defaults = {
      baseURL: $config.app.apiUrl,
      headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
    };

    const params = defu(options, defaults);

    return $fetch<ApiResponse<R, E>>(url, params);
  }
  return ref();
};
