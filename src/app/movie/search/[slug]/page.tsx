
import SearchedMedia from "@/components/media/SearchedMedia"

type SearchPageProps = {
    params : {
        slug: string
    }
}

export default function SearchMoviePage ({params}: SearchPageProps) {
    
    return (
        <div>
            {params && <SearchedMedia type="movie" query={params.slug} /> }
        </div>
    )
}