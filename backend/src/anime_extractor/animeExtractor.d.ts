export interface Episode {
  id: string;
  title: string;
  japanese_title: string;
  poster: string;
  type?: string;
  duration?: string | null;
  rank?: number;
  aired?: string | null;
  episodes_info?: {
    sub: number;
    dub: number;
    quality?: string | null;
  };
}

export interface SpotlightItem extends Episode {
  description: string;
}

export interface EpisodeItem extends Episode {
  episodes_info?: null;
  is_adult_rated: boolean;
}

export interface HomeResponse {
  spotlight: SpotlightItem[];
  recent_episodes: EpisodeItem[];
  newly_added: EpisodeItem[];
  top_upcoming: EpisodeItem[];
}

interface TrendingAndTopAnimeResponse {
  top_animes: {
    today: Episode[];
    week: Episode[];
    month: Episode[];
  };
  trending_animes: Episode[];
}
