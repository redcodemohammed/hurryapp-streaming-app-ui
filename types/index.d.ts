export {};

declare global {
  type ApiOauthUrls = {
    google?: string;
  };
  type Video = {
    id: Number;
    title: String;
    cover: String;
  };

  type LoginResponse = {
    accessToken: string;
  }

  type EventMessageReceived = {
    message: string
  };
}

declare module "#app" {
  interface PageMeta {
    public?: boolean;
  }
}
