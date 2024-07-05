import PopularMovies from "@/components/media/PopularMovies";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";

export default function Home() {
  return (
      <div>
        <Suspense fallback={<div className="relative top-11"><LoadingSpinner /></div>}>
          <PopularMovies />
        </Suspense>
      </div>
  );
}
