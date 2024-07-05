export type NavLink = {
    title: string;
    path: string;
}

export type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date?: string;
    poster_path: string;
    backdrop_path: string;
    genres?: {
        name: string
    }[];
    credits?: {
        cast: {
            id: number;
            profile_path: string
        }[];
    };
}

