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
    total_episode?: number;
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

export interface TrendingAndTopAnimeResponse {
  top_animes: {
    today: Episode[];
    week: Episode[];
    month: Episode[];
  };
  trending_animes: Episode[];
}

export type LabelLinkType = {
  label: string;
  link: string;
};

export type LabelID = {
  label: string;
  id: string;
};

export type LabelIDTitle = {
  label: string;
  id: string;
  title: string;
};
export interface AnimeInfoResponse extends Episode {
  description: string;
  native_japanese_title: string;
  premiered: string;
  airing_status: string;
  MAL_score: number;
  rated: string;
  genres: LabelID[];
  productions_info: {
    studios: LabelID[];
    producers: LabelID[];
  };
  other_seasons: LabelIDTitle[];
  recommended_animes?: EpisodeItem[];
}
