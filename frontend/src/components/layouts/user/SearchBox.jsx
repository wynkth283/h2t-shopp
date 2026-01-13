import { useState, useEffect, useRef } from "react";
import { products } from "../../../data/Product";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBox() {
    const [val, setVal] = useState("");
    const [suggest, setSuggest] = useState([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);
    const boxRef = useRef(null);
    const notfoundRef = useRef(null);

    const handleChange = (e) => {
        setVal(e.target.value);
        setLoading(true);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const searchVal = e.target.value.toLowerCase();
            const res = products.filter(item =>
                item.tensp.toLowerCase().includes(searchVal)
            );
            setSuggest(res);
            setLoading(false);
        }, 350);
    };

    function bokhoantrang(name) {
        return name.replace(/\s+/g, '-');
    }
    
    const navigate = useNavigate();
    const search = (text = val) => {
        if (!text) return;
        const safeText = encodeURIComponent(bokhoantrang(text));
        navigate("/search/" + safeText);
        setSuggest([]);
    };

    

    const highlight = (str) => {
        if (!val) return str;
        const regex = new RegExp(`(${val})`, "gi");
        return str.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
    };

    useEffect(() => {
        const hideSuggest = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setSuggest([]);
            }
        };

        const hideNotFoundBox = (e) => {
            if (notfoundRef.current && !notfoundRef.current.contains(e.target) && !boxRef.current.contains(e.target)) {
                setVal("");
                setSuggest([]);
            }
        };

        document.addEventListener("click", hideSuggest);
        document.addEventListener("click", hideNotFoundBox);

        return () => {
            document.removeEventListener("click", hideSuggest);
            document.removeEventListener("click", hideNotFoundBox);
        };
    }, []);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div className="relative w-full max-w-[550px] mx-auto group" ref={boxRef}>
            <div className={`flex items-center border-none transition-all duration-500 ease-out rounded-full gap-2 border-2 shadow-sm`}>
                <div className={`pl-3 transition-transform duration-300 ${val ? 'scale-110 text-red-800' : 'text-slate-400'}`}>
                    <Search size={18}/>
                </div>

                <input
                    type="text"
                    value={val}
                    onChange={handleChange}
                    onKeyDown={e => {
                        if (e.key === "Enter") search();
                        if (e.key === "Escape") { setVal(""); setSuggest([]); }
                    }}
                    placeholder="Bạn muốn tìm gì hôm nay?..."
                    className="p-2 outline-none bg-transparent w-full text-[12px] md:text-[15px] font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                />
                <div className="flex items-center gap-1">
                    {val && (
                        <button 
                            onClick={() => { setVal(""); setSuggest([]); }}
                            className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-800 transition-all active:scale-90"
                        >
                            <svg xmlns="www.w3.org" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    )}
                </div>
            </div>
            {val && (
                <div className="absolute w-full bg-white/90 backdrop-blur-2xl border border-white rounded-b-[30px] mt-2 max-h-[420px] overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] z-[100] animate-in fade-in zoom-in-95 duration-200">
                    <div className="overflow-y-auto max-h-[420px] no-scrollbar p-3">
                        {loading ? (
                            <div className="p-10 flex flex-col items-center gap-4">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-red-800/10 border-t-red-800 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-[11px] font-black text-red-800/50 uppercase tracking-[0.3em]">Searching</p>
                            </div>
                        ) : suggest.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between px-3 pb-2 pt-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sản phẩm gợi ý</p>
                                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">{suggest.length} kết quả</span>
                                </div>
                                
                                <div className="grid gap-1">
                                    {suggest.map((item, index) => (
                                        <div
                                            key={item.id || index}
                                            onClick={() => search(item.tensp)}
                                            className="group/item flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white hover:shadow-md hover:ring-1 hover:ring-slate-100 rounded-[20px] transition-all duration-200"
                                        >
                                            <div className="w-10 h-10 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center group-hover/item:bg-red-50 transition-colors">
                                                <svg xmlns="www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 group-hover/item:text-red-800"><path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/></svg>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span 
                                                    className="text-sm text-slate-700 font-semibold group-hover/item:text-red-900 transition-colors line-clamp-1"
                                                    dangerouslySetInnerHTML={{ __html: highlight(item.tensp) }}
                                                ></span>
                                                <span className="text-[11px] text-slate-400 font-medium">Trong danh mục sản phẩm</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div ref={notfoundRef} className="p-12 text-center flex flex-col items-center gap-2" data-id="notfoundbox">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-2">
                                    <i className="fa fa-search"></i>
                                </div>
                                <p className="text-sm font-bold text-slate-500">Hệ thống không tìm thấy kết quả</p>
                                <p className="text-xs text-slate-400 italic">Thử thay đổi từ khóa tìm kiếm của bạn</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
}
