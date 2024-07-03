import Link from "next/link"

export default function Logo () {
    return (
        <div className="text-4xl font-semibold ">
            <Link href="/">
                <p className="text-red-500">
                    Cine
                    <span className="text-white">Hub</span>
                </p>
        </Link>         
        </div>
    )
}