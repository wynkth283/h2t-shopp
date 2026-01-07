import { useState } from "react";
import { NavLink } from "react-router-dom";
import FadeDown from "../../../animation/FadeDown";
import AnhQuangCao from "../../../../assets/img/quangcao/AnhQuangCao.png"

export default await function Advertisement() {
    const [hidden, setHidden] = useState(false);
    // Close alert handler
    function handleCloseAdvertisement(e) {
        if (e.target.dataset.dismiss === "alert") {
            setHidden(true);
        }
    }
    if (hidden) return null;
    // Open alert

    return (
      <div 
      data-id="alert"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
    >
      {/* Backdrop mờ ảo siêu thực */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
              onClick={handleCloseAdvertisement}
                data-dismiss="alert"
      ></div>

      <FadeDown className="relative bg-white rounded-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden w-full max-w-[580px] animate-in zoom-in-95 duration-300">
        
        {/* Media Container với hiệu ứng phủ (Overlay) */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={AnhQuangCao}
            alt="Promotion"
            className="w-full h-full object-cover transition-transform duration-[5000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10"></div>
          
          {/* Badge giảm giá nổi bật */}
          <div className="absolute bottom-4 left-6 bg-red-600 text-white px-4 py-2 rounded-2xl font-black text-xl shadow-lg shadow-red-900/40 animate-bounce">
            -15%
          </div>
        </div>

        {/* Content Section - Bento Style */}
        <div className="p-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-2 block">
                Đặc quyền hội viên
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter leading-tight">
                Ưu Đãi <span className="text-red-900">Đặc Biệt</span>
              </h2>
            </div>
          </div>
          
          <p className="mt-4 text-slate-500 font-medium leading-relaxed">
            Nâng tầm trải nghiệm mua sắm của bạn. Đăng ký hội viên ngay hôm nay để nhận voucher giảm giá và hàng ngàn đặc quyền khác tại <span className="font-bold text-slate-700">H2T SHOPP</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <NavLink 
              to="/product/hoivien"
              onClick={handleCloseAdvertisement}
              className="flex-1 bg-red-900 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest shadow-xl shadow-red-900/30 hover:bg-black transition-all active:scale-95 group"
            >
              Trải nghiệm ngay
              <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </NavLink>
            
            <button 
              className="px-8 py-4 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
              onClick={handleCloseAdvertisement}
                data-dismiss="alert"
            >
              Để sau
            </button>
          </div>
        </div>

        {/* Footer subtle tag */}
        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            🛡️ Bảo mật thông tin • Áp dụng tại khu vực Đồng Nai
          </p>
        </div>
      </FadeDown>
    </div>


    );
}