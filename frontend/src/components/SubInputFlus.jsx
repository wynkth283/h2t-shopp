import { useCart } from '../context/CartProvider';

export default function SubInputFlus() {
    const { qty, handlePlus, handleSub, handleChangeQty } = useCart();

    return (
        <div className="flex items-center justify-between  group/container">
            
            <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-black text-slate-400 tracking-[0.15em] group-hover/container:text-red-900 transition-colors">
                    Số lượng
                </span>
                <span className="text-[10px] text-slate-400 font-medium italic opacity-0 group-hover/container:opacity-100 transition-opacity">
                    {qty >= 10 ? "Ưu đãi số lượng lớn" : "Chọn số lượng"}
                </span>
            </div>

            <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner transition-all duration-300">
                <button onClick={()=>handleSub()} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${qty <= 1 ? "text-slate-300 cursor-not-allowed" : "bg-white text-slate-600 shadow-sm hover:text-red-900 hover:shadow-md"}`}>
                <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <input type="number" min={1} value={qty} onChange={handleChangeQty} className="w-12 bg-transparent text-slate-900 font-black text-center text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                <button onClick={()=>handlePlus()} className="w-9 h-9 flex items-center justify-center bg-white text-slate-600 rounded-xl shadow-sm transition-all duration-200 hover:text-red-900 hover:shadow-md active:scale-90">
                <i className="fa-solid fa-plus text-xs"></i>
                </button>
            </div>
        </div>

    )
}