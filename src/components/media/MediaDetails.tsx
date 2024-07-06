import { BASE_URL, API_KEY, IMAGES_URL } from "@/api/apiConfig"
import ErrorCard from "../shared/ErrorCard";
import Image from "next/image"
import { Movie } from "@/types/types";
import MediaOverview from "./MediaOverview";
import MediaVideos from "./MediaVideos";
import { Suspense } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";

type MediaDetailsProps = {
    mediaId: string;
}

const getMedia = async (url: string) => {
    const res = await fetch(url
        ,{
            next: {
                revalidate: 86400 // 24 hours 
            }
        }
    );
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
}

export default async function MediaDetails({mediaId}: MediaDetailsProps) {

    const movieUrl = `${BASE_URL}/movie/${mediaId}?api_key=${API_KEY}&append_to_response=credits`

    let media: Movie[] = []
    let error: string | null = null

    try {
        const data = await getMedia(movieUrl)
         media = data as Movie[] 
    }catch (e) {
        if (e instanceof Error) {
             error = e.message
        } 
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>


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
                                className='rounded-lg shadow-md '
                                fill
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 ml-12 flex flex-col items-center md:items-start px-3">
                        <p className="sm:text-5xl md:text-3xl lg:text-5xl font-bold mb-2">{media.original_name}</p>
                          <div className="flex items-center justify-center">
                            <div className="flex gap-1 flex-wrap my-2 ">
                                {media.genres.map(({name}, key: number) => {
                                    return (
                                    <div
                                        className="font-semibold border-2 py-1 px-6 rounded-full hover:bg-red-500"
                                        key={key}
                                    >
                                        {name}
                                    </div>
                                    )
                                })}
                            </div>
                          </div>

                        <MediaOverview 
                            numberOfSeasons={media.number_of_seasons}
                            numberOfEpisodes={media.number_of_episodes} 
                            overview={media.overview}
                            releaseDate={media.release_date}
                            credits={media.credits}
                        />

                    </div>
                </div>
            </div>
            <div className="pt-80">
                <Suspense fallback={<div className="relative top-72 "><LoadingSpinner /></div>}>          
                        <MediaVideos mediaId={media.id}  />
                </Suspense>
            </div>
        </div>
    )
}