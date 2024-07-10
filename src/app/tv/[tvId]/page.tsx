import { getMediaTitle } from "@/app/movie/[movieId]/page"
import MediaDetails from "@/components/media/MediaDetails"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Suspense } from "react"

type TvPageProps = {
    params: {
        tvId: string
    }
}

export const generateMetadata = async ({ params }: TvPageProps) => {
    const { tvId } = params;
    const original_name = await getMediaTitle(tvId, "tv");
    return {
        title: `${original_name}`,
    };
};

export default function TvPage ({params}: TvPageProps) {

        const type = "tv"

    return (
        <div>
            <Suspense fallback={<div className="relative top-11"><LoadingSpinner /></div>}>
                <MediaDetails mediaId={params.tvId} type={type}/>
            </Suspense>
        </div>
    )
}