import { useState, useMemo } from "react";
import ProductCard from "../../../ProductCard";
import { thuonghieu } from "../../../../data/Brand";
import { danhmucs } from "../../../../data/Categories";
import { products } from "../../../../data/Product";
import { topdanhgiasp } from "../../../../data/TopDanhGiaSP";
import { NavLink } from "react-router-dom";
import Checkbox from "../../../Checkbox";
import { Menu, X } from "lucide-react";
import TitleSection from "../../../TitleSection";

export default function MainResult({ arr, title, hiddencat }) {
    const [filter, setFilter] = useState({
        category: [],
        thuonghieu: [],
        rating: [],
    });

    const [page, setPage] = useState(1);
    const perPage = 12;

    // Hàm xử lý chọn checkbox
    const handleFilter = (type, value) => {
        setPage(1); // reset về trang 1 khi lọc
        setFilter((prev) => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter((v) => v !== value)
                : [...prev[type], value],
        }));
    };

    // Xóa tất cả filter
    const clearAll = () => {
        setFilter({ category: [], thuonghieu: [], rating: [] });
        setPage(1);
    };

    // Lọc sản phẩm
    const filteredProducts = useMemo(() => {
        return arr.filter((p) => {
            return (
                (filter.category.length ? filter.category.includes(p.iddanhmuc) : true) &&
                (filter.thuonghieu.length ? filter.thuonghieu.includes(p.idthuonghieu) : true) &&
                (filter.rating.length ? filter.rating.includes(p.rate) : true)
            );
        });
    }, [filter]);

    // Phân trang
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const currentData = filteredProducts.slice((page - 1) * perPage, page * perPage);

    const [ isOpen, setIsOpen ] = useState(false);
    return (
        <div className="">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                <TitleSection>Kết quả tìm kiếm</TitleSection>
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all duration-200 rounded-full border border-gray-200 md:hidden"
                >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                        Bộ lọc
                    </span>
                    <Menu size={14} strokeWidth={2.5} className="text-gray-900" />
                </button>
            </div>

            <div className="mb-6"></div>
            <div className="md:grid md:grid-cols-5 md:gap-3 mb-2">
                {/* ==== Sidebar Filter ==== */}
                <div className={`md:col-span-1 md:sticky md:top-5 ${isOpen ? 'block md:hidden' : 'hidden md:block'}`}>
                    {/* Danh mục */}
                    <FilterBox title="Danh mục">
                        {danhmucs.map((item) => (
                            <CheckItem
                                key={item.iddanhmuc}
                                item={item.tendanhmuc}
                                checked={filter.category.includes(item.iddanhmuc)}
                                onChange={() => handleFilter("category", item.iddanhmuc)}
                            />
                        ))}
                    </FilterBox>


                    {/* Thương hiệu */}
                    <FilterBox title="Theo thương hiệu">
                        {thuonghieu.map((item) => (
                            <CheckItem
                                key={item.idthuonghieu}
                                item={item.tenthuonghieu}
                                checked={filter.thuonghieu.includes(item.idthuonghieu)}
                                onChange={() => handleFilter("thuonghieu", item.idthuonghieu)}
                            />
                        ))}
                    </FilterBox>

                    <button
                        onClick={clearAll}
                        className="mt-2 bg-red-800 text-white px-3 py-1 rounded-lg hover:shadow-md"
                    >
                        Xóa tất cả
                    </button>
                    <div className="mt-6 pt-4 border-t border-slate-200 flex gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 flex-1 justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Đóng <X size={18} />
                        </button>
                    </div>
                </div>

                {/* ==== Product List ==== */}
                <div className="md:col-span-4 mt-4">

                    <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
                        {currentData.map((item) => (
                            <ProductCard item={item} key={item.id} />
                        ))}
                    </div>

                    {/* ==== Pagination ==== */}
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}

/* ======= Components nhỏ gọn ======= */
function FilterBox({ title, children }) {
    return (
        <div className="mb-8 last:mb-0">
            {/* Tiêu đề với đường kẻ trang trí tinh tế */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-red-900 rounded-full"></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">
                    {title}
                </h3>
            </div>
            {/* Container danh sách */}
            <ul className="space-y-1">{children}</ul>
        </div>
    );
}

function CheckItem({ item, checked, onChange }) {
    return (
        <li>
            <label className="group flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-all duration-200">
                <div className="flex items-center gap-3">
                    <Checkbox checked={checked} onChange={onChange} />
                    
                    <span className={`text-sm font-medium transition-colors duration-200 
                        ${checked ? 'text-red-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {item}
                    </span>
                </div>
                {checked && (
                    <span className="w-1.5 h-1.5 bg-red-900 rounded-full animate-pulse"></span>
                )}
            </label>
        </li>
    );
}

function Pagination({ page, totalPages, setPage }) {
    if (totalPages <= 1) return null;

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 mt-12 pb-8">
  {/* Thông báo trạng thái nhỏ */}
  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
    Trang <span className="text-red-900">{page}</span> trên tổng <span className="text-slate-800">{totalPages}</span>
  </p>

  <nav className="inline-flex items-center p-1.5 bg-white border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
    {/* Nút Previous */}
    <button
      onClick={() => page > 1 && setPage(page - 1)}
      disabled={page === 1}
      className={`group flex items-center justify-center w-11 h-11 rounded-[14px] transition-all duration-300 ${
        page === 1 
        ? "text-slate-200 cursor-not-allowed" 
        : "text-slate-600 hover:bg-red-50 hover:text-red-900"
      }`}
    >
      <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-active:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
    </button>

    {/* Danh sách các số trang */}
    <div className="flex items-center px-1">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = page === pageNumber;

        // Logic rút gọn trang (chỉ hiện trang hiện tại và lân cận nếu quá nhiều trang)
        if (totalPages > 5 && Math.abs(pageNumber - page) > 1 && pageNumber !== 1 && pageNumber !== totalPages) {
            if (pageNumber === 2 || pageNumber === totalPages - 1) return <span key={i} className="px-2 text-slate-300 font-bold">...</span>;
            return null;
        }

        return (
          <button
            key={i}
            onClick={() => setPage(pageNumber)}
            className={`relative flex items-center justify-center w-11 h-11 text-sm font-black rounded-[14px] transition-all duration-500 overflow-hidden ${
              isActive 
              ? "text-white scale-110 z-10 shadow-lg shadow-red-200" 
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-red-900 animate-in zoom-in duration-300"></div>
            )}
            <span className="relative z-10">{pageNumber}</span>
          </button>
        );
      })}
    </div>

    {/* Nút Next */}
    <button
      onClick={() => page < totalPages && setPage(page + 1)}
      disabled={page === totalPages}
      className={`group flex items-center justify-center w-11 h-11 rounded-[14px] transition-all duration-300 ${
        page === totalPages 
        ? "text-slate-200 cursor-not-allowed" 
        : "text-slate-600 hover:bg-red-50 hover:text-red-900"
      }`}
    >
      <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-active:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </nav>
</div>

        </>
    );
}
