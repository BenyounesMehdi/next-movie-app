"use client"

import { Movie } from '@/types/types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import PopularMoviesCard from '../media/PopularMoviesCard';

type CarouselProps = {
    data: Movie[]
}

export default function Carousel ({data}: CarouselProps) {
    return (
        <div>
                <Splide 
                    options={{
                        perPage: 1, 
                        arrows: true,
                        pagination: false,
                        // drag: "free",
                        gap: "1rem",
                        type: "loop",
                        autoplay: true,
                        interval: 2000
                    }}
                >
                    {
                        data.map((data: Movie) => {
                            return (
                                <SplideSlide key={data.id}>
                                    <PopularMoviesCard data={data} />
                                </SplideSlide>
                            )
                        })
                    }
                </Splide>
        </div>
    )
}