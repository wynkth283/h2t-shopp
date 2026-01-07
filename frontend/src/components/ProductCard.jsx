import { NavLink } from "react-router-dom";
import { tinhgiamgia } from "../until/giasp_giamgiasp";
export default function Product({ item }) {    
    function bokhoantrang(text) {
        return text.replace(/\s+/g, '-').replace(/\//g, '-');
    }

    const giasp = tinhgiamgia(item.giasp, item.giamgia);

    const _day = 5 * 86400000; // 5 * 24 * 60 * 60 * 1000
    const ngayhientai = Date.now();
    const ngaytaosp = new Date(item.createdAt).getTime();

    const spmoi = (ngayhientai - ngaytaosp) <= _day;

    
    return (
      <div 
      className="group relative bg-white rounded-xl border border-slate-100/70 overflow-hidden 
                 transition-all duration-500 ease-out 
                 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2.5 
                 max-w-[290px]" 
      title={item.tensp}
  >
      <NavLink to={`/product/${bokhoantrang(item.tensp) + '-' + item.id}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
              <img 
                  src={item.hinhanhsp} 
                  alt="product"  
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-3">
                  {spmoi && (
                      <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider border border-slate-200">
                          Mới
                      </div>
                  )}
                  {item.giamgia && (
                      <div className="bg-red-600 text-white text-[10px] max-w-fit text-center font-black px-3 py-1 rounded-full shadow-xl shadow-red-600/30 uppercase tracking-wider">
                          -{item.giamgia}%
                      </div>
                  )}
                   {item.hoivien && (
                    <div className="bg-black/70 backdrop-blur-sm text-[#D4AF37] text-[9px] font-black px-2.5 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                        MEMBERS
                    </div>
                  )}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 w-[90%]" style={{transition: 'all .3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'}}>
                  <button className="w-full bg-slate-900/90 backdrop-blur-md text-white py-3 rounded-xl text-xs font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-red-900 transition-colors active:scale-95">
                      {/* <svg xmlns="www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> */}
                      Xem chi tiết
                  </button>
              </div>
          </div>
          <div className="p-5 space-y-3">
              <div className="min-h-[44px]">
                  <h3 className="text-slate-800 text-sm xl:text-base font-bold leading-snug group-hover:text-red-900 transition-colors line-clamp-2">
                      <span className="inline-block bg-red-50 text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded-md mr-1.5 align-middle">HOT</span>
                      {item.tensp}
                  </h3>
              </div>
              <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-red-900 font-black text-sm xl:text-lg tracking-tight">
                      {giasp}<sup className="text-sm ml-0.5">đ</sup>
                  </span>
              </div>
              <div className="h-px bg-slate-100 w-full"></div>
              <div className="flex flex-wrap items-center justify-between gap-y-2 text-[12px] font-semibold text-slate-500">
                  <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                          <span className="text-slate-800">{item.sao}</span>
                          <svg xmlns="www.w3.org" width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      </div>
                      {item.daban > 0 && (
                          <span className="border-l border-slate-200 pl-3">Đã bán {item.daban}</span>
                      )}
                  </div>
              </div>
          </div>
      </NavLink>
  </div>
  

    );
}
    