"use server"

import { BASE_URL,API_KEY } from "@/api/apiConfig";

export const getMoviesGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        ,{
             next: {
                 revalidate: 86400 // 24 hours 
             }
         }
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export const fetchData = async (genre: string, page: number, limit: number) => {

    const moviesByGenreUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`;
    const paginatedUrl = `${moviesByGenreUrl}&page=${page}&limit=${limit}`;

    const res = await fetch(paginatedUrl);
    if (!res.ok) {
        console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

