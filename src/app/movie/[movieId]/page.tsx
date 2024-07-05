import MediaDetails from "@/components/media/MediaDetails"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Suspense } from "react"

type MoviePageProps = {
    params: {
        movieId: string
    }
}

export default function MoviePage ({params}: MoviePageProps) {


    return (
        <div>
            <Suspense fallback={<div className="relative top-11"><LoadingSpinner /></div>}>
                <MediaDetails mediaId={params.movieId} />
            </Suspense>
        </div>
    )
}