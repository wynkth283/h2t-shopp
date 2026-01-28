import ScrollInView from "../../../animation/ScrollInView";
import ContainerScrollInViewIn from "../../../animation/Scroll_In_View/container/ContainerScrollInView";
import ItemScrollInView from "../../../animation/Scroll_In_View/item/ItemScrollInView";
import { NavLink } from "react-router-dom"
import { products } from "../../../../data/Product";
import ProductCard from "../../../ProductCard"
import TitleSection from "../../../TitleSection";

export default function SectionListNewProduct() {
    const sl_hienthi = 4;
    const _day = 180  * 86400000;
    const ngayhientai = Date.now();

    const spmoi = products.filter(i => {
        const ngaytaosp = new Date(i.createdAt).getTime();
        return (ngayhientai - ngaytaosp) <= _day;
    });
    
    if (spmoi.length===0) return <></>;
    
    return (
        <ScrollInView>
            <div className="snap-center">
                <div className="text-xl font-bold mb-6 flex justify-between items-center">
                    <TitleSection>Sản phẩm mới nhất</TitleSection>
                    <NavLink to="/product/new" className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-red-900 transition-colors flex items-center gap-2 group">
                        Xem tất cả <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </NavLink>
                </div>
                <ContainerScrollInViewIn  className={`grid grid-cols-${sl_hienthi} gap-4`}>
                    {
                        spmoi.slice(0,sl_hienthi).map((item) => (
                            <ItemScrollInView key={item.id}>
                                <ProductCard item={item}></ProductCard>
                            </ItemScrollInView>  
                        ))
                    }
                </ContainerScrollInViewIn>
            </div>
        </ScrollInView>
    )
}