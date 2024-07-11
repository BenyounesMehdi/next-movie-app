'use client'

import ErrorCard from "../shared/ErrorCard";
import { Video } from "@/types/types";
import { getMediaVideos } from "@/actions/actions";
import { useEffect, useState } from "react";

type MediaVideosProps = {
    mediaId: string;
    type: string
}


export default function MediaVideos ({mediaId, type}: MediaVideosProps) {

    const [videos, setVideos] = useState<Video[]>([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getMediaVideos(type, mediaId)
                setVideos(data.results.filter((video: Video) => video.name.toLowerCase().includes("trailer"))); 
            }catch (e) {
                if (e instanceof Error) {
                     setError(e.message)
                } 
            }
        }
        fetch()
    }, [mediaId, type])

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        <div className="py-12 px-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-1 container mx-auto">
            {videos.map((video: Video) => (
                <div key={video.id} className="w-full h-[350px] md:h-[300px] px-1">
                        <iframe
                            className=" w-full h-[300px] md:h-[250px] border-2 border-white rounded-md"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={video.name}
                        ></iframe>
                    <p className="mt-2 font-semibold text-sm">{video.name}</p>
                </div>
            ))}
        </div>
    )
}