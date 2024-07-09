import { BASE_URL, API_KEY } from "@/api/apiConfig";
import ErrorCard from "../shared/ErrorCard";
import { Movie } from "@/types/types";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import NoDataFound from "../shared/NoDataFound";

type SearchedMediaProps = {
    type: string;
    query: string
}

const getMediaSearch = async (url: string) => {
    
    const res = await fetch(url
        ,{
            next: {
                revalidate: 86400 // 24 hours 
            }
        }
    );
    if (!res.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    return res.json();
}

export default async function SearchedMedia ({ type, query }: SearchedMediaProps) {

    let searchedMedia: Movie[] = []
    let error: string | null = null
    
    const searchMovieUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}` 

    try {
        const data = await getMediaSearch(searchMovieUrl)
        searchedMedia = data.results as Movie[] 
    }catch (e) {
        if (e instanceof Error) {
             error = e.message
        } 
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>


    return (    
        <div className="container mx-auto relative pt-32 pb-10 px-2">
                {searchedMedia.length > 0 ?
                    <div className="grid gap-1 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                        {searchedMedia.map((media: Movie) => {
                            return <Link href={`/movie/${media.id}`} key={media.id}>
                                <CategoryCard image={media.poster_path} title={media.title} />
                            </Link>
                        })
                        }
                    </div>
                    : <div className="">
                        <NoDataFound />
                    </div>
                }
        </div>
    )
}