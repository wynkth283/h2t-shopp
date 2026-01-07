import FadeIn from "./animation/FadeIn";

export default function Alert({ show, message, onConfirm, onCancel, title = "Xác nhận" }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop với hiệu ứng nhòe cao cấp */}
            <div 
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-[8px] transition-all duration-500 animate-in fade-in"
                onClick={onCancel} 
            />

            <FadeIn>
                <div className="relative bg-white rounded-[32px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] w-full max-w-[440px] overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                    
                    {/* Phần nội dung chính */}
                    <div className="px-8 pt-10 pb-6 text-center">
                        {/* Icon Container với hiệu ứng Gradient mượt */}
                        <div className="w-20 h-20 bg-gradient-to-tr from-red-50 to-orange-50 rounded-[28px] flex items-center justify-center mx-auto mb-6 relative group">
                            <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-10"></span>
                            
                            {/* Inner Circle phát sáng */}
                            <div className="absolute inset-0 rounded-[28px] bg-red-500/5 blur-xl group-hover:bg-red-500/10 transition-all"></div>
                            
                            <svg xmlns="www.w3.org" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 relative z-10">
                                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                            {title}
                        </h2>
                        <p className="text-slate-500 text-[15px] font-medium leading-relaxed px-2">
                            {message || "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn loại bỏ mục này?"}
                        </p>
                    </div>

                    {/* Button Group: Sắp xếp lại để dễ bấm bằng ngón cái trên Mobile */}
                    <div className="px-8 pb-8 pt-2 flex flex-row gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full px-6 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                            <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M20 6 9 17l-5-5"/></svg>
                            Xác nhận
                        </button>
                        
                        <button
                            onClick={onCancel}
                            className="w-full px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm tracking-wide hover:bg-slate-100 hover:text-slate-700 transition-all active:scale-[0.98]"
                        >
                            Quay lại
                        </button>
                    </div>

                    {/* Footer mang tính thương hiệu */}
                    <div className="bg-slate-50/80 backdrop-blur-sm py-4 text-center border-t border-slate-100/60">
                        <div className="flex items-center justify-center gap-2 opacity-40">
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
                                H2T SHOPP SECURITY • 2025
                            </p>
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
