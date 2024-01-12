export const useAuth = () => {
  const authStore = useAuthStore();
  const { isLoggedIn, user } = storeToRefs(authStore);
  const $toast = useToast();
  const { t: $t } = useI18n();

  async function login(username: string, password: string) {
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const response = await apiFetch<LoginResponse>("/login", {
        body: form,
        method: "POST",
      });

      if (response?.accessToken) {
        authStore.accessToken = response.accessToken;
      }
    } catch (e) {
      $toast.add({ title: $t("messages.usernameOrPasswordIsInValid"), color: "red", icon: "i-tabler-face-id-error" });
    }
  }

  async function register(username: string, password: string) {
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const response = await apiFetch<LoginResponse>("/register", {
        body: form,
        method: "POST",
      });

      if (response?.accessToken) {
        authStore.accessToken = response.accessToken;
      }
    } catch (e) {
      $toast.add({ title: $t("messages.usernameOrPasswordIsInValid"), color: "red", icon: "i-tabler-face-id-error" });
    }
  }

  function logout() {
    authStore.accessToken = null;
    authStore.user = null;
  }

  return {
    login,
    register,
    logout,
    isLoggedIn,
    user,
  };
};
