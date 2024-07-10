import { getMediaTitle } from "@/actions/actions";
import { BASE_URL, API_KEY } from "@/api/apiConfig";
import MediaDetails from "@/components/media/MediaDetails"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Suspense } from "react"

type MoviePageProps = {
    params: {
        movieId: string
    }
}



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