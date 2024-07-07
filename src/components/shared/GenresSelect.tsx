'use client'

import { Genre } from "@/types/types";
import { useEffect } from "react";

type GenresSelectProps = {
    genres: Genre[]; 
    onGenreChange: (genre: string) => void;
    selectedGenre: string;
}

export default function GenresSelect({ genres, onGenreChange, selectedGenre }: GenresSelectProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onGenreChange(e.target.value);
    }   

    return (
        <div className="flex justify-center items-center flex-col py-5">
            <div className="w-full flex flex-col items-center px-4">
                <select
                    onChange={handleChange}
                    value={selectedGenre}
                    className="bg-white text-black w-full py-2 px-2 rounded-full font-semibold outline-none ring-transparent"
                >
                    {genres.map((genre: Genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
