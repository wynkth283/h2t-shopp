import { useEffect, useState } from "react";
import TopToBot from "./animation/TopToBot";

export default function Notification({ type, message, onClose }) {
    const [visible, setVisible] = useState(true);

    const styles = {
        success: {
            container: "bg-white/90 border-emerald-100 text-emerald-900 shadow-emerald-200/40",
            icon: "fa-circle-check text-emerald-500",
            progress: "bg-emerald-500"
        },
        error: {
            container: "bg-white/90 border-rose-100 text-rose-900 shadow-rose-200/40",
            icon: "fa-circle-xmark text-rose-500",
            progress: "bg-rose-500"
        },
        warning: {
            container: "bg-white/90 border-amber-100 text-amber-900 shadow-amber-200/40",
            icon: "fa-triangle-exclamation text-amber-500",
            progress: "bg-amber-500"
        },
        info: {
            container: "bg-white/90 border-blue-100 text-blue-900 shadow-blue-200/40",
            icon: "fa-info-circle text-blue-500",
            progress: "bg-blue-500"
        }
    };

    const currentStyle = styles[type] || styles.info;

    useEffect(() => {
        if (!onClose) return;
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); 
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const handleManualClose = () => {
        setVisible(false);
        setTimeout(onClose, 500);
    };

    return (
        <TopToBot className="min-w-[320px] max-w-[90vw] fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
            <div
                className={`
                    relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}
                    backdrop-blur-xl border-2 ${currentStyle.container} 
                    px-5 py-4 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] 
                    flex items-center gap-4
                `}
            >
                {/* Icon Section */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        <i className={`fa-solid ${currentStyle.icon} text-xl`}></i>
                        <span className={`absolute inset-0 blur-md opacity-40 ${currentStyle.icon}`}>
                             <i className={`fa-solid ${currentStyle.icon} text-xl`}></i>
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold tracking-tight leading-tight">
                        {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Notification"}
                    </span>
                    <span className="text-sm font-medium opacity-80 leading-relaxed">
                        {message}
                    </span>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleManualClose}
                    className="p-2 -mr-2 rounded-xl hover:bg-slate-50/50 transition-colors group"
                    aria-label="Close"
                >
                    <i className="fa-solid fa-xmark text-slate-400 group-hover:text-slate-600 text-sm"></i>
                </button>

                {/* Thanh đếm ngược (Progress Bar) */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100/30">
                    <div 
                        className={`h-full ${currentStyle.progress} transition-all duration-[4000ms] ease-linear ${visible ? 'w-full' : 'w-0'}`}
                    />
                </div>
            </div>
        </TopToBot>
    );
}
