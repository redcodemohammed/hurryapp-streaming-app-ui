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
    user: {
      id: number
      username: string
    }
    message: string
  };

  type EventVideoSeeked = {
    position: number
  };

  type EventUserJoined = {
    members: number
  }

  type EventUserLeft = {
    members: number
  }
}

declare module "#app" {
  interface PageMeta {
    public?: boolean;
  }
}
