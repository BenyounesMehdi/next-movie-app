import { BASE_URL, API_KEY } from "@/api/apiConfig";
import ErrorCard from "@/components/shared/ErrorCard";
import GenresSection from "@/components/shared/GenresSection";
import SearchForm from "@/components/shared/SearchForm";
import { Genre } from "@/types/types";



const getMoviesGenres = async (url: string) => {
    const res = await fetch(url
        // ,{
        //     next: {
        //         revalidate: 86400 // 24 hours 
        //     }
        // }
    );
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
}

export default async function MoviesPage () {

    const moviesGenresUrl = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`

    let moviesGenres: Genre[] = []
    let error: string | null = null

    try {
        const data = await getMoviesGenres(moviesGenresUrl)
        moviesGenres = data as Genre[] 
        console.log("movies genres: ",moviesGenres)
    }catch (e) {
        if (e instanceof Error) {
            error = e.message
        } 
    }

    if(error) return <div className="relative top-11"><ErrorCard /></div>

    return (
        <div className="relative top-20 container mx-auto">
            
            <div className="flex flex-col md:flex-row justify-center items-center ">
                <div className="w-full md:w-3/4 px-2 md:px-1">
                    <SearchForm placeHolder="Search a movie" />
                </div>
                <GenresSection genres={moviesGenres} />
            </div>

        </div>  
    )
}