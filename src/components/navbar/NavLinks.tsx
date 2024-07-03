'use client'

import { NavLink } from "@/types/types"
import Link from "next/link"
import { useState } from "react";
import { RiMenu3Fill, RiCloseLargeLine } from "react-icons/ri";
import NavMobile from "./NavMobile";

type NavLinksPorps = {
    pathName: string
}


export default function NavLinks ({pathName}: NavLinksPorps) {

    const links: NavLink[] = [
        {title: "HOME", path: "/"},
        {title: "MOVIES", path: "movies"},
        {title: "TV SERIES", path: "tvs"}
    ]

    const [showNavMobile, setShowNavMobile] = useState<boolean>(false)

    const toggleNavMobile = () => {
        setShowNavMobile(!showNavMobile)
    }

    const displayLinks = () => {
        return links.map((link, key: number) => {
            return (
                <Link 
                    className={`font-medium text-xl cursor-pointer hover:text-red-500
                         ${(pathName === `/${link.path}` || (pathName === '/' && link.path === '/')) ? 'underline decoration-red-500' : ''}`}
                    href={link.path}
                    key={key}>
                    {link.title}
                </Link>
            )
        })
    }
    
    return (
        <div>

            <div className="hidden md:flex gap-3">
                {displayLinks()}
            </div>

            <div className="md:hidden text-2xl">
                {!showNavMobile 
                    ? <RiMenu3Fill onClick={toggleNavMobile} className="cursor-pointer" /> 
                    : <RiCloseLargeLine onClick={toggleNavMobile} className="cursor-pointer" />
                }
            </div>
            <NavMobile showNavMobile={showNavMobile} displayLinks={displayLinks} />
        </div>
    )
}