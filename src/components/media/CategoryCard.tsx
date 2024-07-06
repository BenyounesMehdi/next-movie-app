import { IMAGES_URL } from "@/api/apiConfig"
import Image from "next/image"

type CategoryCardProps = {
    image: string;
    title: string
}

export default function CategoryCard ({image, title}: CategoryCardProps) {
    return (
        <div className="flex justify-center items-center flex-col gap-1 hover:opacity-30 cursor-pointer">
                                        
            <div className="w-36 xl:w-40 h-[250px] relative ">
                <Image
                    className="rounded-lg"
                    src={`${IMAGES_URL}${image}`}
                    alt="caracter image"
                    fill
                />
            </div>
            <p className=" md:font-medium text-sm ">{title}</p>
        </div>
    )
}