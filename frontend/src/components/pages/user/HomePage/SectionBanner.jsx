import { useState, useEffect, useRef } from "react";
import FadeIn from "../../../animation/FadeIn";

const images = [
  "https://cf.shopee.vn/file/sg-11134258-82252-mhkm8gq9xb7s62",
  "https://cf.shopee.vn/file/vn-11134258-820l4-mhk6wug042yrf5",
  "https://cf.shopee.vn/file/vn-11134258-820l4-mhk6yhjm20aq9f",
];

export default function SectionBanner() {
  const [i, setI] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const prev = () => {
    resetTimeout();
    setI((prevI) => (prevI === 0 ? images.length - 1 : prevI - 1));
  };

  const next = () => {
    resetTimeout();
    setI((prevI) => (prevI + 1) % images.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 5000);
    return () => resetTimeout();
  }, [i]);

  return (
    <FadeIn>
      <div className="relative w-full overflow-hidden group rounded-[16px] md:rounded-[32px] shadow-2xl shadow-slate-200/50">
        <div 
          className="flex w-full h-[160px] md:h-[300px] lg:h-[450px] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative shrink-0 grow-0 basis-full w-full h-full">
              <img 
                src={img} 
                className="w-full h-full select-none" 
                alt={`banner-${idx}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
        <button 
          onClick={prev} 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 flex items-center justify-center rounded-sm md:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500 hover:bg-white/40 active:scale-90 z-20"
        >
          <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button 
          onClick={next} 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 flex items-center justify-center rounded-sm md:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500 hover:bg-white/40 active:scale-90 z-20"
        >
          <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { resetTimeout(); setI(idx); }}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                i === idx 
                ? "w-8 bg-white shadow-lg shadow-white/50" 
                : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-xl rounded-full border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">New Deals</span>
        </div>

      </div>
    </FadeIn>
  );
}
