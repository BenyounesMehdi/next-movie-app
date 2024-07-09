'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { RiCloseLargeLine } from "react-icons/ri"

type SearchFormProps = {
    placeHolder: string;
    type: string
}

export default function SearchForm ({placeHolder, type}: SearchFormProps) {
    
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const router = useRouter()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)

        if(e.target.value.trim().length > 0) setShowDeleteButton(true)
        else setShowDeleteButton(false)
    }

    const deleteInputValue = () => {
        setInputValue("")
        setShowDeleteButton(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(inputValue.trim().length > 0) {
            type === "movie" ? router.push(`/movie/search/${inputValue}`)
                             : router.push(`/tv/search/${inputValue}`)
        } 
    }

    return (
        <div className="container mx-auto  flex justify-center items-center">
            <form
                onSubmit={handleSubmit} 
                className="w-full flex justify-center items-center bg-white rounded-full py-2 px-3">
                <input 
                    type="text" 
                    className="w-full outline-none ring-0 text-black font-medium " 
                    placeholder={placeHolder}
                    onInput={handleInput}
                    value={inputValue}
                 />
                {showDeleteButton && 
                    <RiCloseLargeLine
                        onClick={deleteInputValue} 
                        className="text-black font-semibold ml-1 cursor-pointer"
                     />
                }
            </form>
        </div>
    )
}