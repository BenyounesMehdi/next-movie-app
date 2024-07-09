'use client'

import { Genre } from "@/types/types";
import GenresSelect from "./GenresSelect";
import { useEffect, useState } from "react";

type GenresSectionProps = {
    genres: Genre[]; 
    setMovieGenre: (genre: string) => void
}

export default function GenresSection({ genres, setMovieGenre }: GenresSectionProps) {

    const [genre, setGenre] = useState<string>("");

    useEffect(() => {
        if (genres) {
            const savedGenre = localStorage.getItem("selectedMovieGenre");
            if (savedGenre) {
                setGenre(savedGenre);
                setMovieGenre(savedGenre)
            } else {
                setGenre(String(genres[0].id));
                setMovieGenre(String(genres[0].id))
                localStorage.setItem("selectedMovieGenre", String(genres[0].id));
            }
        }   
    }, [genres]);

    const handleGenreChange = (genre: string) => {
        setGenre(genre);
        setMovieGenre(genre)
        localStorage.setItem("selectedMovieGenre", genre);
    };

    return (
        <div className="w-2/4 md:w-1/4">
            {genres && (
                <GenresSelect 
                    genres={genres} 
                    onGenreChange={handleGenreChange} 
                    selectedGenre={genre}
                />
            )}
        </div>
    );
}
