import { Movie, Tv } from "@/types/types";
import ErrorCard from "../shared/ErrorCard";
import CategoryCarousel from "./CategoryCarousel";

type CategoryCardProps = {
    url: string
}

const getCategoryMedia = async (url: string) => {
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

export default async function Categories ({ url }: CategoryCardProps ) {

    let MediaCategory: Movie[] | Tv[] = [];
    let error: string | null = null

    try {
        const data = await getCategoryMedia(url)
        MediaCategory = url.includes("tv") ? (data.results as Tv[]) : (data.results as Movie[]);
    }catch (e) {
        if (e instanceof Error) {
             error = e.message
        } 
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        
        <div>
            <CategoryCarousel data={MediaCategory} url={url} />
        </div>
    )
}