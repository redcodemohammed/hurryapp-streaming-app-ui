export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie("access_token");
  const isLoggedIn = computed(() => !!accessToken.value);

  if (!to.meta.public) {
    // the route is not public
    if (!isLoggedIn.value) {
      //  the user not signed in
      return navigateTo({ name: "login", query: { redirect: to.fullPath } });
    }
  }

  if (to.meta.public) {
    // the route is public
    if (isLoggedIn.value) {
      //  the user signed in
      return navigateTo({ name: "index" });
    }
  }
});
