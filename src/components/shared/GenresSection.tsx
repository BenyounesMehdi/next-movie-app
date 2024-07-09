'use client'

import { Genre } from "@/types/types";
import GenresSelect from "./GenresSelect";
import { useEffect, useState } from "react";

type GenresSectionProps = {
    genres: Genre[]; 
    setMediaGenre: (genre: string) => void;
    type: string
}

export default function GenresSection({ type, genres, setMediaGenre }: GenresSectionProps) {

    const [genre, setGenre] = useState<string>("");

    useEffect(() => {
        if (genres) {
            const savedMovieGenre = localStorage.getItem("selectedMovieGenre");
            const savedTvGenre = localStorage.getItem("selectedTvGenre");

            if(type === "movie") {
                if (savedMovieGenre) {
                    setGenre(savedMovieGenre);
                    setMediaGenre(savedMovieGenre)
                } else {
                    setGenre(String(genres[0].id));
                    setMediaGenre(String(genres[0].id))
                    localStorage.setItem("selectedMovieGenre", String(genres[0].id));
                }
            }
            else {
                if (savedTvGenre) {
                    setGenre(savedTvGenre);
                    setMediaGenre(savedTvGenre)
                } else {
                    setGenre(String(genres[0].id));
                    setMediaGenre(String(genres[0].id))
                    localStorage.setItem("selectedTvGenre", String(genres[0].id));
                }
            }
            
        }   
    }, [genres]);

    const handleGenreChange = (genre: string) => {
        
        // setGenre(genre);
        // setMediaGenre(genre)
        if(type === "movie") {
            localStorage.setItem("selectedMovieGenre", genre);
            setGenre(genre);
            setMediaGenre(genre)
        }
        else {
            localStorage.setItem("selectedTvGenre", genre);
            setGenre(genre)
            setMediaGenre(genre)
        }
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
