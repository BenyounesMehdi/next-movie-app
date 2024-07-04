
type ButtonProps = {
    title: string
}

export default function Button ({title}: ButtonProps) {
    return (
        <button
            className="bg-red-500 border-2 border-white font-semibold text-xl rounded-full px-5 py-1  hover:bg-red-700 hover:shadow-lg">
            {title}
        </button>
    )   
} 