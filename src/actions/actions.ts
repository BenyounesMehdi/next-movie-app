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
        throw new Error('Failed to fetch');
    }
    return res.json();
}