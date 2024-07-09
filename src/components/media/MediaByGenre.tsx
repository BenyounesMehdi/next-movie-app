'use client'

import LoadingSpinner from "../shared/LoadingSpinner"
import ErrorCard from "../shared/ErrorCard"
import Button from "../shared/Button"
import { Movie } from "@/types/types"
import Link from "next/link"
import CategoryCard from "./CategoryCard"
import { useEffect, useState } from "react"
import { fetchData } from "@/actions/actions"

type MoviesByGenreProps = {
    type: string;
    genre: string
}


export default function MoviesByGenre ({ type, genre }: MoviesByGenreProps) {

    const [mediaByGenre, setMediaByGenre] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    

    const loadMoreData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchData(genre, page + 1, 20);
            setMediaByGenre(oldData => [...oldData, ...data.results]);
            setPage(page + 1);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onScroll = async () => {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
            await loadMoreData()
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const initialData = await fetchData(genre, page, 20);
                setMediaByGenre(initialData.results);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
        };
        fetchInitialData()
    }, [genre])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [page, isLoading, genre])

    if (error) return <div className="pt-11"><ErrorCard /></div>;

    return (
        <div>
            <div className="sm:px-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-7 gap-1 sm:gap-2">
                {mediaByGenre.map((media: Movie) => (
                    <Link key={media.id} href={`/movie/${media.id}`}>
                        <CategoryCard image={media.poster_path} title={media.title} />
                    </Link>
                ))}                    
            </div>
            <div className="flex justify-center items-center w-full py-2">
                {isLoading && <LoadingSpinner />}
            </div>   
        </div>
    )
}