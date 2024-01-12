export const useAuthStore = defineStore("auth", () => {
  const accessToken = useCookie("access_token");
  const user = useLocalStorage("user", null);

  const isLoggedIn = computed(() => !!accessToken.value);

  return {
    accessToken,
    user,
    isLoggedIn,
  };
});
