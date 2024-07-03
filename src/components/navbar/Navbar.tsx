'use client'

import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathName = usePathname()

    return (
        <div className="absolute z-10 w-full py-3 flex justify-between items-center px-5 ">
                <Logo />
                <NavLinks pathName={pathName} />
            </div>
    )
}