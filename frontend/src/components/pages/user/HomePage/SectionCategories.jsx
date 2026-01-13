import { danhmucs } from "../../../../data/Categories"
import TitleSection from "../../../TitleSection";
import ContainerScrollInViewIn from "../../../animation/Scroll_In_View/container/ContainerScrollInView";
import ItemScrollInViewLeft from "../../../animation/Scroll_In_View/item/ItemScrollInViewLeft";
import { useNavigate } from "react-router-dom";
import Img from "../../../../assets/img/white.jpg"

export default function SectionCategories() {
    const navigate = useNavigate();
    const handleToCat = (name) => {
        navigate("/category/" + name);
    };
    
    function bokhoantrang(name) {
        return name.replace(/\s+/g, '-');
    }


    const ClickToCatPage = () => {
        navigate('/categories');
    } 

    return (
        <div className="py-20 relative overflow-hidden">
            <style>
            {`
                @keyframes scroll-infinite {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-240px * ${danhmucs.length} - 1.5rem * ${danhmucs.length})); }
                }
                .track-infinite {
                    display: flex;
                    width: max-content;
                    animation: scroll-infinite 60s linear infinite;
                }
                .track-infinite:hover {
                    animation-play-state: paused;
                }
            `}
            </style>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 flex flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <TitleSection>Danh mục nổi bật</TitleSection>
                </div>
                <button
                    onClick={ClickToCatPage}
                    className="text-slate-400 text-[8px] md:text-xs font-bold uppercase tracking-widest hover:text-red-900 transition-colors flex items-center gap-2 group">
                    Xem tất cả <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>

            {/* Carousel Container */}
            <div className="relative group">
                {/* Lớp phủ Gradient làm mờ 2 đầu */}
                <div className="absolute inset-y-0 left-0 w-15 md:w-40 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-15 md:w-40 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[1] pointer-events-none">
                    <img 
                        src={Img} 
                        alt="pattern" 
                        className="w-full h-full object-repeat"
                    />
                </div>

                <div className="overflow-hidden py-5 md:py-10">
                    <ContainerScrollInViewIn className="track-infinite flex gap-6">
                        {[...danhmucs, ...danhmucs].map((item, index) => (
                            <ItemScrollInViewLeft
                                key={`${item.iddanhmuc}-${index}`}
                                className="w-[120px] md:w-[240px] group/item cursor-pointer"
                            >
                                <div
                                onClick={() => handleToCat(bokhoantrang(item.tendanhmuc))} className="relative h-[220px] rounded-[12px] md:h-[320px] md:rounded-[48px] overflow-hidden shadow-xl transition-all duration-700 ease-out group-hover/item:-translate-y-4 group-hover/item:shadow-2xl group-hover/item:shadow-red-900/20">
                                    
                                    <div className="absolute inset-0">
                                        <img 
                                            src={item.hinhanh} 
                                            alt={item.tendanhmuc}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-125"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/item:opacity-90 transition-opacity"></div>
                                    </div>

                                    {/* Nội dung trên nền ảnh */}
                                    <div className="relative h-full z-10 p-8 flex flex-col items-center justify-end text-center">
                                        <div className="space-y-2 translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500">
                                            <p className="hidden md:block text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">
                                                Collection
                                            </p>
                                            <h3 className="font-black text-white text-[10px] md:text-xl tracking-tighter uppercase leading-tight">
                                                {item.tendanhmuc}
                                            </h3>
                                            <div className="hidden md:block pt-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700">
                                                <span className="px-5 py-2 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                                                    Khám phá
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ItemScrollInViewLeft>
                        ))}
                    </ContainerScrollInViewIn>
                </div>
            </div>
        </div>
    )
}
