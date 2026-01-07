import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <NavLink to="/" className="group flex items-center gap-3 relative">
            <div className="relative">
                <div className="bg-gradient-to-br from-red-800 to-red-950 text-white w-11 h-11 flex items-center justify-center rounded-full
                                shadow-[0_8px_16px_-6px_rgba(153,27,27,0.5)] 
                                group-hover:shadow-[0_12px_20px_-8px_rgba(153,27,27,0.7)]
                                group-hover:-rotate-6 group-hover:scale-105 
                                transition-all duration-300 ease-out">
                <span className="font-black text-2xl tracking-tighter">H</span>
                </div>
            </div>
            <div className="flex flex-col justify-center -space-y-1">
                <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-red-950 transition-colors">
                    H2T
                    <span className="text-red-800 relative">
                        SHOPP
                    </span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase group-hover:text-red-700 transition-colors">
                    Premium Store
                </span>
            </div>
        </NavLink>
    )
}