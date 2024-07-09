'use client'

import { getMediasGenres } from "@/actions/actions";
import MediaByGenre from "@/components/media/MediaByGenre";
import ErrorCard from "@/components/shared/ErrorCard";
import GenresSection from "@/components/shared/GenresSection";
import SearchForm from "@/components/shared/SearchForm";
import { Genre } from "@/types/types"
import { useEffect, useState } from "react"

export default function TvsPage () {

    const [tvsGenres, setTvsGenres] = useState<Genre[]>([])
    const [error, setError] = useState<string | null>(null);
    const [selectedTvGenre, setSelectedTvGenre] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMediasGenres("tv")
                setTvsGenres(data.genres)
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

    const setTvGenre = (genre: string) => {
        setSelectedTvGenre(genre)
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        <div className="relative top-20 container mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center ">
                <div className="w-full md:w-3/4 px-2 md:px-1">
                    <SearchForm type="tv" placeHolder="Search a tv serie" />
                </div>
                {tvsGenres.length > 0 && <GenresSection type="tv" setMediaGenre={setTvGenre} genres={tvsGenres} />} 
            </div>

            <div>
                <MediaByGenre type="tv" genre={selectedTvGenre}/>
            </div>
        </div>
    )
}