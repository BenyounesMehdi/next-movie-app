'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import CategoryCard from './CategoryCard'
import { Movie } from '@/types/types';
import Link from 'next/link';

type RowCarouselProps = {
    data: Movie[];
};

export default function CategoryCarousel({ data }: RowCarouselProps) {

    return (
        <div>
            <Splide
                options={{
                    perPage: 7,
                    breakpoints: {
                        1440: { perPage: 7 },
                        1200: { perPage: 6 },
                        992: { perPage: 5 },
                        768: { perPage: 4 },
                        576: { perPage: 3 },
                        480: { perPage: 2 },
                        360: { perPage: 2 }
                    },
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "5px",
                    type: "loop"
                }}
            >
                {data.map((movie) => (
                    <SplideSlide key={movie.id}>
                        <Link href={`/movie/${movie.id}`}>
                            <CategoryCard image={movie.poster_path} title={movie.title} />
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}
