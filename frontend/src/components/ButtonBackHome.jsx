import Logo from "./Logo"
export default function ButtonBackHome() {
    return (
        <div className="flex justify-center items-center group relative cursor-pointer">
            <div className="transition-all duration-500 transform group-hover:scale-110 group-active:scale-95">
                <Logo />
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 blur-xl rounded-full transition-all duration-500 -z-10"></div>
            </div>
            <div className="
                absolute left-full ml-4 top-1/2 -translate-y-1/2 
                whitespace-nowrap pointer-events-none z-20
                px-3 py-1.5 rounded-xl
                bg-slate-900/90 backdrop-blur-md text-white
                border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                text-[11px] font-bold uppercase tracking-wider
                
                /* Hiệu ứng xuất hiện mượt mà: Slide + Fade */
                opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                transition-all duration-300 ease-out
            ">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-house-chimney text-[10px] text-red-400"></i>
                    Về trang chủ
                </div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900/90"></div>
            </div>
        </div>
    )
}