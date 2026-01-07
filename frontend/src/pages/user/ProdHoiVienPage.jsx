import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/Product";
import MainResult from "../../components/pages/user/SearchResult/MainResult";  
import { danhmucs } from "../../data/Categories";
import Breadcrumb from "../../components/Breadcrumb";

export default function ProdHoiVienPage() {
    const hoivien = products.filter(i => i.hoivien === true);
    if (!hoivien) return <>Hãy là hội viên của shop để nhận được nhiều ưu đãi</>;
    document.title = 'Hội viên | H2T Shopp';

    return (
        <>
            <Breadcrumb category={"Hội viên"} style={{fontSize: "20px", margin: "0 0 10px 0", padding: "0"}}/>
            <MainResult arr={hoivien} title={'Sản phẩm dành cho hội viên'} hiddencat={false}></MainResult>
        </>
    )
}