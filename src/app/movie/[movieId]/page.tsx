import { BASE_URL, API_KEY } from "@/api/apiConfig";
import MediaDetails from "@/components/media/MediaDetails"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Suspense } from "react"

type MoviePageProps = {
    params: {
        movieId: string
    }
}

export const getMediaTitle = async (mediaId: string, type: string) => {
    const mediaUrl = type === "movie"
        ? `${BASE_URL}/movie/${mediaId}?api_key=${API_KEY}`
        : `${BASE_URL}/tv/${mediaId}?api_key=${API_KEY}`;
    
    const res = await fetch(mediaUrl);
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data.title || data.original_name;
};

export const generateMetadata = async ({ params }: MoviePageProps) => {
    const { movieId } = params;
    const title = await getMediaTitle(movieId, "movie");
    return {
        title: `${title}`,
    };
};

export default function MoviePage ({params}: MoviePageProps) {

        const type = "movie"
    return (
        <div>
            <Suspense fallback={<div className="relative top-11"><LoadingSpinner /></div>}>
                <MediaDetails mediaId={params.movieId} type={type} />
            </Suspense>
        </div>
    )
}