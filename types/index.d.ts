export {}

declare global {
  type ApiOauthUrls = {
    google?: string;
  }

  type LoginResponse = {
    accessToken: string;
  }
}

declare module "#app" {
  interface PageMeta {
    public?: boolean;
  }
}
