'use client'

import { Genre } from "@/types/types";
import GenresSelect from "./GenresSelect";
import { useEffect, useState } from "react";

type GenresSectionProps = {
    genres: {
        genres: Genre[]; // Assuming genres is an object with a 'genres' property
    };
}

export default function GenresSection({ genres }: GenresSectionProps) {
    
    const data = genres
    const [genre, setGenre] = useState<string>(String(genres.genres[0].id));

    console.log("data: ", data)
    console.log("first data: ", genres.genres[0].id)

    useEffect(() => {
        if (genres) {
            const savedGenre = localStorage.getItem("selectedMovieGenre");
            if (savedGenre) {
                setGenre(savedGenre);
            } else {
                setGenre(String(genres.genres[0].id));
                localStorage.setItem("selectedMovieGenre", String(genres.genres[0].id));
            }
        }
    }, [genres]);

    const handleGenreChange = (genre: string) => {
        console.log("handleGenreChange: ", genre);
        setGenre(genre);
        localStorage.setItem("selectedMovieGenre", genre);
    };

    console.log("movie genre: ", genre);

    return (
        <div className="w-2/4 md:w-1/4">
            {data ? (
                <GenresSelect 
                    genres={data} 
                    onGenreChange={handleGenreChange} 
                    selectedGenre={genre}
                />
            ) : (
                <div>No genres available</div>
            )}
        </div>
    );
}
