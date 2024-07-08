
import SearchedMedia from "@/components/media/SearchedMedia"

type SearchPageProps = {
    params : {
        slug: string
    }
}

export default function SearchMoviePage ({params}: SearchPageProps) {
    
   console.log("params: ",params)

    return (
        <div>
            {params && <SearchedMedia type="movie" query={params.slug} /> }
        </div>
    )
}