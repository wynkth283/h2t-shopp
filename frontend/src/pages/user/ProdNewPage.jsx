import { products } from "../../data/Product";
import MainResult from "../../components/pages/user/SearchResult/MainResult";  
import Breadcrumb from "../../components/Breadcrumb";

export default function ProdNewPage() {
    document.title = 'Sản phẩm mới | H2T Shopp';
    const _day = 20 * 86400000;
    const ngayhientai = Date.now();

    const spmoi = products.filter(i => {
        const ngaytaosp = new Date(i.createdAt).getTime();
        return (ngayhientai - ngaytaosp) <= _day;
    });
    
    if (!spmoi) return <>Chờ đợi sản phẩm mới nhất nhé</>;

    return (
        <>
            <Breadcrumb category={"Sản phẩm mới"} style={{fontSize: "20px", margin: "0 0 10px 0", padding: "0"}}/>
            <MainResult arr={spmoi} title={'Sản phẩm mới'} hiddencat={false}></MainResult>
        </>
    )
}