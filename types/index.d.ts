export {}

declare global {
  type ApiOauthUrls = {
    google?: string;
  }

  type LoginResponse = {
    accessToken: string;
  }
}
