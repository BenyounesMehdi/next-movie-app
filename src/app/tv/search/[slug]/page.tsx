
import SearchedMedia from "@/components/media/SearchedMedia"

type SearchPageProps = {
    params : {
        slug: string
    }
}

export default function SearchTvePage ({params}: SearchPageProps) {
    
    return (
        <div>
            {params && <SearchedMedia type="tv" query={params.slug} /> }
        </div>
    )
}