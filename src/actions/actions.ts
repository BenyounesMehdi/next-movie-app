"use server"

import { BASE_URL,API_KEY } from "@/api/apiConfig";

export const getMediasGenres = async (type: string) => {
    const tempUrl = type === "movie" 
                    ? `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
                    : `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`

    const res = await fetch(tempUrl
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

export const fetchData = async (type: string, genre: string, page: number, limit: number) => {

    const mediaByGenreUrl = type === "movie"
                            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
                            : `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre}`
                            
    const paginatedUrl = `${mediaByGenreUrl}&page=${page}&limit=${limit}`;

    const res = await fetch(paginatedUrl);
    if (!res.ok) {
        console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

