export interface SpotifyTrack {
    id: string;
    preview_url: string;
    artists: [{ name: string }];
    name: string;
    imageUrl?: string;
  }
