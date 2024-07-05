import { IMAGES_URL } from "@/api/apiConfig";
import Link from "next/link";
import Image from "next/image"
import { Movie } from "@/types/types";
import Button from "../shared/Button";

type PopularMoviesCardProps = {
    data: Movie
}

export default function PopularMoviesCard ({data}: PopularMoviesCardProps) {

    const {id, title, overview, poster_path, backdrop_path} = data

    return (
        <div className='h-screen w-screen relative '>
                    <Image 
                        src={`${IMAGES_URL}${backdrop_path}`} 
                        alt="Movie backdrop image"
                        fill
                        objectFit="cover"
                    />
                 
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black">
                    <div className='absolute top-48 sm:top-44 w-full  flex justify-between h-[400px]'>
                        <div className='w-full md:w-1/2  md:ml-16 flex flex-col justify-evenly items-center p-3 md:p-0'>
                            <p className=' left-10 text-5xl lg:text-6xl font-bold '>
                                {title}
                            </p>
                            <p className='mt-10 text-sm lg:text-md font-semibold mb-5'>
                                {overview}
                            </p>
                            <Link href={`/movie/${id}`}>
                                <Button title="Show details" />
                            </Link>
                        </div>
                        <div className='md:w-1/2 hidden md:flex justify-center items-center '>
                            <div className="md:w-[64%] lg:w-[50%] xl:w-[42%] h-full relative">
                                <Image 
                                    src={`${IMAGES_URL}${poster_path}`}  
                                    alt="Movie poster image"
                                    className='rounded-lg shadow-md '
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    </div>
        </div>
    )
}