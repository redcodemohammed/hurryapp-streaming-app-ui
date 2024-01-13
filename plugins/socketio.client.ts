import { io } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("access_token");

  const socket = io(config.app.websocketUrl, {
    query: {
      token: accessToken.value,
    },
  });

  return {
    provide: {
      socket,
    },
  };
});
