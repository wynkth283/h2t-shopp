

export default function Checkbox({...props}){
    return (
        <div className="relative flex items-center justify-center">
            <input  type="checkbox"
                    className=" peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md shadow-sm
                                checked:bg-red-900 checked:border-red-900 
                                transition-all duration-300 
                                cursor-pointer" 
                    {...props}
            />
            <svg 
                className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="4"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
    )
}