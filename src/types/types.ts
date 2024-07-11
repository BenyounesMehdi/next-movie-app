export type NavLink = {
    title: string;
    path: string;
}

export type CastMember = {
    id: number;
    profile_path: string;
  };
  
  export type Credits = {
    cast: CastMember[];
  };

export type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    genres?: {
        name: string
    }[];
    credits: Credits;
}


export type Tv = {
    id: number;
    original_name: string;
    overview: string;
    first_air_date: string;
    poster_path: string;
    backdrop_path: string;
    genres: {
        name: string
    }[];
    credits: Credits;
    number_of_episodes: number;
    number_of_seasons: number;
};

export type Video = {
    id: number;
    key: string;
    name: string;
}

export type Genre = {
    id: number;
    name: string
}