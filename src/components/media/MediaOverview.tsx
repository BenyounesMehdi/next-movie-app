'use client'

import { useState } from "react";
import Image from "next/image"
import { IMAGES_URL } from "@/api/apiConfig";

type MediaOverviewProps = {
    id: string;
    numberOfSeasons: number;
    numberOfEpisodes: number;
    overview: string;
    releaseDate: string;
    credits: {
        cast: {
            id: string;
            profile_path: string
        }[];
    }
}

export default function MediaOverview ({numberOfSeasons, numberOfEpisodes, overview, releaseDate, credits}: MediaOverviewProps) {

    const top3Cast = credits?.cast.slice(0, 3);
   
    const [showFullOverview, setShowFullOverview] = useState<boolean>(false);

    const toggleOverview = () => {
        setShowFullOverview(!showFullOverview);
    };

    return (
        <div>
            <div className={`${!showFullOverview ? 'flex justify-center md:justify-start gap-2 mt-3 flex-wrap' : 'hidden'}`}>
                            {top3Cast?.map((cast) => {
                                return (
                                    <div key={cast.id} className="w-20 h-[100px] relative ">
                                        <Image
                                            className="rounded-lg"
                                            src={`${IMAGES_URL}${cast.profile_path}`}
                                            alt="caracter image"
                                            fill
                                         />
                                    </div>
                                )
                            })}
            </div>

            <p className={`${!showFullOverview ? 'text-xl font-semibold pb-2 mt-2' : 'hidden' } `}>
                <span className="text-red-500">Release data: </span>
                {releaseDate}
            </p>

            {numberOfEpisodes && numberOfSeasons && !showFullOverview && (
                            <>
                                <p className="text-xl font-semibold pb-2 ">
                                    <span className="text-red-500">Number of seasons: </span>
                                    {numberOfSeasons}
                                </p>
                                <p className="text-xl font-semibold pb-2 ">
                                    <span className="text-red-500">Total episodes: </span>
                                    {numberOfEpisodes}
                                </p>
                            </>
            )}                       

            <p className="text-md lg:text-md font-semibold mb-2  px-1 md:p-0">
                            {showFullOverview ? overview : `${overview.slice(0, 100)}...`}
                            {!showFullOverview && (
                                <button
                                    className="text-red-500 underline ml-2 mb-2 cursor-pointer"
                                    onClick={toggleOverview}
                                >
                                    Read more
                                </button>
                            )}
                            {showFullOverview && (
                                <button
                                    className="text-red-500 underline ml-2 mb-2 cursor-pointer"
                                    onClick={toggleOverview}
                                >
                                    Show less
                                </button>
                            )}
            </p>                     
        </div>
    )
}