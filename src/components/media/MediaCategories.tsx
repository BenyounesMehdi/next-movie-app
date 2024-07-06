import { BASE_URL,API_KEY } from "@/api/apiConfig"
import Categories from "./Categories";

type Categorie = {
    title: string;
    url: string;
}

export default function MediaCategories () {

    const categories: Categorie[] = [
        {title: "Trending movies", url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`},
        // {title: "Top rated movies", url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`},
        // {title: "Trending TV", url: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`},
        // {title: "Top rated TV", url: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`},
    ]

    return (
        <div className="mt-10 container mx-auto py-3">
            {categories.map(({title, url}, key) => {
                return <div className="mb-2" key={key}>
                    <p className="font-semibold text-2xl mb-3 ml-2">{title}</p>
                    <Categories url={url} />
                </div>
            })}
        </div>
    )
}