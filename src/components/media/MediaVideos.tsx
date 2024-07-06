import { BASE_URL, API_KEY } from "@/api/apiConfig";
import ErrorCard from "../shared/ErrorCard";
import { Movie, Video } from "@/types/types";

type MediaVideosProps = {
    mediaId: string;
}

const getMediaVideos = async (url: string) => {
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

export default async function MediaVideos ({mediaId}: MediaVideosProps) {

    // const videosUrl = `${BASE_URL}/${mediaType}/${mediaId}/videos?api_key=${API_KEY}`;
    const videosUrl = `${BASE_URL}/movie/${mediaId}/videos?api_key=${API_KEY}`;

    let videos: Video[] = []
    let error: string | null = null

    try {
        const data = await getMediaVideos(videosUrl)
        videos = data.results.filter((video: Video) => video.name.toLowerCase().includes("trailer")); 
    }catch (e) {
        if (e instanceof Error) {
             error = e.message
        } 
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        <div className="pt-96 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-1 container mx-auto">
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