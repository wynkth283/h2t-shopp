import SectionBanner from '../../components/pages/user/HomePage/SectionBanner';
import ProductCard from '../../components/ProductCard';

import Countdown from '../../components/pages/user/HomePage/CoutDown';
import MainProducts from '../../components/pages/user/HomePage/MainProducts'
import SectionCategories from '../../components/pages/user/HomePage/SectionCategories';
import SectionListNewProduct from '../../components/pages/user/HomePage/SectionListNewProduct';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// animation
import ContainerScrollInViewIn from '../../components/animation/Scroll_In_View/container/ContainerScrollInViewIn';
import ItemScrollInViewRight from '../../components/animation/Scroll_In_View/item/ItemScrollInViewRight';
import ScrollInViewRight from '../../components/animation/ScrollInViewRight';
import ContainerListSlide from '../../components/animation/ContainerListSlide';
import ItemListSlideUp from '../../components/animation/ItemListSlideUp';

// data
import { products } from '../../data/Product';
import Img from "../../assets/img/red.jpg";
import { linkTo } from '../../data/linkTo';

export default function HomePage() {
    document.title = 'H2T Shopp';
    function toSection(a) {
        window.location.hash = a;
    }

    const [activeTab, setActiveTab] = useState(linkTo[0]?.hashlink);

    const handleTabClick = (hashlink) => {
        setActiveTab(hashlink);
        toSection(hashlink);
    };
    return (
        <div className="flex flex-col gap-10">
            {/* <AdvertisementImg /> */}
            <div className="snap-center"><SectionBanner /></div>
            <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                <div className="absolute inset-y-0 left-0 w-70 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-70 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/50 to-transparent z-20 pointer-events-none"></div>
                <ContainerListSlide className="flex justify-center items-center gap-10 overflow-x-auto no-scrollbar shadow-inner">
                    {linkTo.map((i, idx) => {
                        const isActive = activeTab === i.hashlink;
                        return (
                            <ItemListSlideUp key={idx} >
                                <div 
                                
                                onClick={() => handleTabClick(i.hashlink)}
                                className={`
                                    relative p-4 text-sm font-medium cursor-pointer whitespace-nowrap transition-all duration-300
                                    ${isActive ? 'text-red-800' : 'text-slate-500 hover:text-slate-900'}
                                `}
                            >
                                {i.name}
                                <span className={`
                                    absolute bottom-0 left-0 h-0.5 bg-red-800 transition-all duration-300
                                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                `}></span>
                                {isActive && (
                                    <span className="absolute inset-0 bg-red-50/50 -z-10 animate-pulse" />
                                )}
                            </div>
                            </ItemListSlideUp>
                        );
                    })}
                </ContainerListSlide>
            </nav>
            <div className="snap-center" id={linkTo[0].hashlink}><SectionCategories /></div>
            <div className="snap-center" id={linkTo[1].hashlink}><SectionListNewProduct /></div>
            
            {/* Ưu đãi độc quyền */}
            <div className="snap-center" id={linkTo[2].hashlink}>
                <div className="relative overflow-hidden rounded-4xl bg-[#0f172a] my-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[1] pointer-events-none">
                        <img 
                            src={Img} 
                            alt="pattern" 
                            className="w-full h-full object-repeat"
                        />
                    </div>
                    <div className="relative z-10 p-8 lg:p-14">
                        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                            
                            {/* Content Section */}
                            <div className="space-y-6 max-w-lg">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">Flash Sale 48h</p>
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                                        Ưu đãi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">độc quyền</span> <br /> 
                                        cho hội viên
                                    </h2>
                                    <p className="text-base text-slate-400 font-medium leading-relaxed">
                                        Đặc quyền dành riêng cho khách hàng thân thiết. <br className="hidden lg:block"/>
                                        <span className="text-white font-semibold">Miễn phí vận chuyển</span> & Tặng gói quà cao cấp.
                                    </p>
                                </div>

                                {/* Countdown Custom UI */}
                                <div className="py-2">
                                    <Countdown />
                                </div>

                                <ScrollInViewRight>
                                    <NavLink 
                                        to="/product/hoivien" 
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-red-800 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-red-950 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-500 group/btn"
                                    >
                                        Xem thêm
                                        <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </NavLink>
                                </ScrollInViewRight>
                            </div>

                            {/* Products Grid Section */}
                            <div className="flex-1">
                                <ContainerScrollInViewIn>
                                    {products.filter(item => item.hoivien === true).slice(0, 1).map((item) => (
                                        <ItemScrollInViewRight key={item.id} className='flex item-center justify-center'>
                                            <ProductCard item={item} />
                                        </ItemScrollInViewRight>
                                    ))}
                                </ContainerScrollInViewIn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Danh mục sản phẩm */}
            <div className="snap-center" id={linkTo[3].hashlink}><MainProducts></MainProducts></div>
        </div>
    );
}