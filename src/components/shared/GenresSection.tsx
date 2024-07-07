'use client'

import { Genre } from "@/types/types";
import GenresSelect from "./GenresSelect";
import { useEffect, useState } from "react";

type GenresSectionProps = {
    genres: Genre[]; 
}

export default function GenresSection({ genres }: GenresSectionProps) {
    
    const [genre, setGenre] = useState<string>(String(genres[0].id));

    useEffect(() => {
        if (genres) {
            const savedGenre = localStorage.getItem("selectedMovieGenre");
            if (savedGenre) {
                setGenre(savedGenre);
            } else {
                setGenre(String(genres[0].id));
                localStorage.setItem("selectedMovieGenre", String(genres[0].id));
            }
        }
    }, [genres]);

    const handleGenreChange = (genre: string) => {
        setGenre(genre);
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
