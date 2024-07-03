import { NavLink } from "@/types/types";
import Link from "next/link";

type NavMobileProps = {
    showNavMobile: boolean;
    displayLinks: () => JSX.Element[];
}

export default function NavMobile ({showNavMobile, displayLinks}: NavMobileProps) {
    return (
        <div>
            {showNavMobile
                &&
                <div 
                    className="absolute md:hidden bg-white text-black left-10 right-10 py-2 rounded-lg top-16 flex flex-col justify-center items-center gap-1">
                    {displayLinks()}
                </div>
            }
        </div>
    )
}