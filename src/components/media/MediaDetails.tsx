'use client'

import ErrorCard from "../shared/ErrorCard";
import Image from "next/image"
import { Movie, Tv } from "@/types/types";
import MediaOverview from "./MediaOverview";
import MediaVideos from "./MediaVideos";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { getMedia } from "@/actions/actions";
import { IMAGES_URL } from "@/api/apiConfig";

type MediaDetailsProps = {
    mediaId: string;
    type: string
}

export default function MediaDetails({mediaId, type}: MediaDetailsProps) {

    const [media, setMedia] = useState<Movie | Tv | null>(null);
    const [error, setError] = useState<string | null>(null);

    // const numberOfSeasons: number = type === 'tv' ? (media as Tv).number_of_seasons : 0; 
    // const numberOfEpisodes: number = type === 'tv' ? (media as Tv).number_of_episodes : 0;
    // const [credits, setCredits] = useState<{ cast: { id: string; profile_path: string }[] } | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMedia(mediaId, type);
                setMedia(data);
                console.log("media: ", data)
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
        };

        fetchData();
    }, [mediaId, type]);

    if(error) return <div className="relative top-11"><ErrorCard /></div>
    
    if (!media) return <div className="relative top-11"><LoadingSpinner /></div>;
    // const title = type === 'movie' ? (media as Movie).title : (media as Tv).original_name;

    return (
        <div className="h-screen relative">
        <Image
            src={`${IMAGES_URL}${media.backdrop_path}`}
            alt="Media backdrop image"
            fill
            objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br p-5 from-transparent to-black">
            <div className="absolute top-44 sm:top-36 w-full px-4 flex right-10 h-[450px]">
                <div className="md:w-1/2 hidden md:flex justify-end items-center px-5 ml-5 ">
                    <div className="md:w-[90%] lg:w-[65%] xl:w-[55%] h-full relative">
                        <Image
                            src={`${IMAGES_URL}${media.poster_path}`}
                            alt="Media poster image"
                            className="rounded-lg shadow-md"
                            fill
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 ml-12 flex flex-col items-center md:items-start px-3">
                    <p className="sm:text-5xl md:text-3xl lg:text-5xl font-bold mb-2">
                        {type === "movie" ? (media as Movie).title : (media as Tv).original_name}
                    </p>
                    <div className="flex items-center justify-center">
                        <div className="flex gap-1 flex-wrap my-2 ">
                            {media.genres?.map(({ name }, key: number) => (
                                <div
                                    className="font-semibold border-2 py-1 px-6 rounded-full hover:bg-red-500"
                                    key={key}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <MediaOverview
                        numberOfSeasons={type === 'tv' ? (media as Tv).number_of_seasons : 0}
                        numberOfEpisodes={type === 'tv' ? (media as Tv).number_of_episodes : 0}
                        overview={media.overview}
                        releaseDate={type === 'movie' ? (media as Movie).release_date : (media as Tv).first_air_date}
                        credits={media.credits}
                        type={type}
                    />
                </div>
            </div>
        </div>
        <div className="pt-80">
            <Suspense fallback={<div className="relative top-72 "><LoadingSpinner /></div>}>
                <MediaVideos mediaId={String(media.id)} type={type} />
            </Suspense>
        </div>
    </div>
    )
}