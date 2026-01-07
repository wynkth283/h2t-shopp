import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/Product";
import MainResult from "../../components/pages/user/SearchResult/MainResult";  
import { danhmucs } from "../../data/Categories";

export default function SearchResult() {
    const { kw } = useParams();
    if (!kw) return <>No keyword found</>;
    
    const productFormatted = kw.replace(/-/g, ' ');

    document.title = productFormatted + ' | H2T Shopp';

    function removeVietnameseTones(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d").replace(/Đ/g, "D")
            .toLowerCase();
    }

    function fuzzy(text, keyword) {
        text = removeVietnameseTones(text);
        keyword = removeVietnameseTones(keyword);

        let i = 0, j = 0;

        while (i < text.length && j < keyword.length) {
            if (text[i] === keyword[j]) j++;
            i++;
        }
        return j === keyword.length;
    }


    // 1. Tìm sản phẩm match fuzzy theo tên
    const matchedProducts = products.filter(item => fuzzy(item.tensp, productFormatted));

    // 2. Tìm danh mục match fuzzy theo keyword
    const matchedCategories = danhmucs.filter(cat => fuzzy(cat.tendanhmuc, productFormatted));
    const matchedCategoryIds = matchedCategories.map(cat => cat.iddanhmuc);

    // 3. Lấy sản phẩm thép đúng danh mục fuzzy match
    const productsFromMatchedCategories = products.filter(item =>
        matchedCategoryIds.includes(item.iddanhmuc) &&
        !matchedProducts.some(p => p.id === item.id)
    );

    // 4. ID danh mục của các sản phẩm match fuzzy theo tên
    const relatedCategoryIds = [...new Set(matchedProducts.map(p => p.iddanhmuc))];

    // 5. Lấy sản phẩm liên quan cùng danh mục với sản phẩm match fuzzy
    const relatedProducts = products.filter(item =>
        relatedCategoryIds.includes(item.iddanhmuc) &&
        !matchedProducts.some(p => p.id === item.id) &&
        !productsFromMatchedCategories.some(p => p.id === item.id)
    );

    // 6. Merge kết quả (ưu tiên theo độ liên quan)
    const ketQua = [
        ...matchedProducts,              // sản phẩm match theo tên
        ...productsFromMatchedCategories, // match theo danh mục fuzzy
        ...relatedProducts               // liên quan danh mục theo sản phẩm match
    ];

    return (
        <>
            {
                ketQua.length > 0 ?
                (
                    <>
                        <div className="border-b border-gray-200 pb-5 mb-8">
                        <h1 className="text-xl font-bold text-gray-900">
                            Tìm kiếm kết quả liên quan đến 
                            <span className="text-red-600 ml-2">"{productFormatted}"</span>
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Đã tìm thấy {ketQua.length} sản phẩm liên quan
                        </p>
                        </div>
                        <MainResult arr={ketQua} title={"Sản phẩm liên quan"}/>
                    </>
                ) :
                (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <i className="fa fa-cancel text-[100px] text-red-900"></i>

                        <h3 className="text-2xl font-bold text-gray-800 mt-3 mb-3">
                            Không tìm thấy sản phẩm nào
                        </h3>
                        
                        <p className="text-gray-600 max-w-md">
                            Không có kết quả phù hợp với từ khóa <span className="text-red-900">"{productFormatted}"</span>.
                        </p>
                    </div>
                )
            }
        </>
    )
}