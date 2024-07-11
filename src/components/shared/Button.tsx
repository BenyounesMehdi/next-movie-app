
type ButtonProps = {
    title: string;
    onClick?: () => void
}

export default function Button ({title,  onClick}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-red-500 border-2 border-white font-semibold text-xl rounded-full px-5 py-1  hover:bg-red-700 hover:shadow-lg">
            {title}
        </button>
    )   
} 