import { BASE_URL, API_KEY } from "@/api/apiConfig";
import { Movie } from "@/types/types";
import ErrorCard from "../shared/ErrorCard";
import Carousel from "../shared/Carousel";


const getPopularMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!res.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    return res.json();
}

export default async function PopularMovies () {

    let popularMovies: Movie[] = []
    let error: string | null = null

    try {
        const data = await getPopularMovies()
         popularMovies = data.results as Movie[] 
    }catch (e) {
        if (e instanceof Error) {
             error = e.message
        } 
    }

    return (
        <div>
            {error ? <ErrorCard /> :
                <Carousel data={popularMovies} />
                // <p>data fetched</p>
            }
        </div>
    )
}