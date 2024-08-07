'use client'

import { getMediasGenres } from "@/actions/actions";
import MediaByGenre from "@/components/media/MediaByGenre";
import ErrorCard from "@/components/shared/ErrorCard";
import GenresSection from "@/components/shared/GenresSection";
import SearchForm from "@/components/shared/SearchForm";
import { Genre } from "@/types/types";
import { useEffect, useState } from "react";



export default function MoviesPage () {

    const [moviesGenres, setMoviesGenres] = useState<Genre[]>([])
    const [error, setError] = useState<string | null>(null);
    const [selectedMovieGenre, setSelectedMovieGenre] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMediasGenres("movie")
                setMoviesGenres(data.genres)
            }catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('Failed to fetch genres');
                }
            }
        }
        fetchData()
    }, [])

    const setMovieGenre = (genre: string) => {
        setSelectedMovieGenre(genre)
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        <div className="relative top-20 container mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center ">
                <div className="w-full md:w-3/4 px-2 md:px-1">
                    <SearchForm type="movie" placeHolder="Search a movie" />
                </div>
                {moviesGenres.length > 0 && <GenresSection type="movie" setMediaGenre={setMovieGenre} genres={moviesGenres} />} 
            </div>

            <div>
                <MediaByGenre type="movie" genre={selectedMovieGenre}/>
            </div>
        </div>  
    )
}