'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import CategoryCard from './CategoryCard'
import { Movie, Tv } from '@/types/types';
import Link from 'next/link';

type RowCarouselProps = {
    data: Movie[] | Tv[];
    url: string
};

export default function CategoryCarousel({ data, url }: RowCarouselProps) {

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
                {data.map((media: Movie | Tv) => (
                    <SplideSlide key={media.id}>
                        <Link href={url.includes("tv") ? `/tv/${media.id}` : `/movie/${media.id}`}>
                            <CategoryCard 
                                image={media.poster_path} 
                                // title={url.includes("tv") ? media.original_name : media.title}
                                title={"title" in media ? media.title : media.original_name}
                            />
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}
