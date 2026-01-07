import React, { useState } from 'react';
import TitleSection from '../../components/TitleSection';
import { danhmucs } from '../../data/Categories';

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [val, setVal] = useState("");

    const handleChangeInput = (e) => {
        setVal(e.target.value);
    }
    const filteredCategories = danhmucs.filter(cat =>
        cat.tendanhmuc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="max-w-xl">
                        <TitleSection>
                        Danh mục sản phẩm
                        </TitleSection>
                    </div>
                    
                    <div className="flex gap-2 bg-white px-5 py-4 rounded-full border-none shadow-sm focus:ring-2 focus:ring-slate-900 transition-all duration-300 placeholder:text-slate-400 text-slate-600">
                        <div className="text-slate-400">
                            <i className='fa fa-search'></i>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm trong danh mục"
                            className="w-full outline-none"
                            onChange={(e) => {setSearchTerm(e.target.value)}}
                        />
                    </div>
                </div>

                {/* Grid Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCategories.map((category) => (
                        <div 
                            key={category.iddanhmuc}
                            className="group relative h-[400px] overflow-hidden rounded-3xl bg-slate-200 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <img 
                                src={category.hinhanh} 
                                alt={category.tendanhmuc}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110 group-hover:rotate-1"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 opacity-80 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {category.count} Sản phẩm
                                </span>
                                <h3 className="text-3xl font-medium mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {category.tendanhmuc}
                                </h3>
                                
                                <div className="h-[2px] w-0 bg-white group-hover:w-full transition-all duration-700" />
                                
                                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                    <span className="text-sm font-semibold uppercase tracking-widest">Khám phá ngay</span>
                                    <svg xmlns="www.w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-3xl">
                        <p className="text-slate-400 text-xl font-light">Rất tiếc, chúng tôi không tìm thấy danh mục này</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-blue-600 font-semibold hover:underline"
                        >
                            Xem tất cả danh mục
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
