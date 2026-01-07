import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/Product";
import MainResult from "../../components/pages/user/SearchResult/MainResult";  
import { danhmucs } from "../../data/Categories";
import Breadcrumb from "../../components/Breadcrumb";

export default function ProdCategoryPage() {
    const { category } = useParams();
    if (!category) return <>No keyword found</>;

    const categoryFormatted = category.replace(/-/g, ' ');
    document.title = categoryFormatted + ' | H2T Shopp';


    const tendanhmuc = danhmucs.filter(item => item.tendanhmuc.includes(categoryFormatted));
    const iddanhmuc = tendanhmuc.map(i => i.iddanhmuc);

    const sanpham_theo_danhmuc = products.filter(i => iddanhmuc.includes(i.iddanhmuc));
    return (
        <>
            <Breadcrumb category={categoryFormatted} style={{fontSize: "20px", margin: "0 0 10px 0", padding: "0"}}/>
            <MainResult arr={sanpham_theo_danhmuc} title={'Danh mục "' + categoryFormatted +'"'} hiddencat={true}></MainResult>
        </>
    )
}