import { products } from "../../../data/Product";
import { NavLink } from "react-router-dom";
import TitleSection from "../../TitleSection";

export default function Recently() {
    return (
        <div className="mt-24">
            <TitleSection>Vừa xem gần đây</TitleSection>
            <div className="mb-4"></div>
          
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {products.map((item) => (
                <NavLink 
                    key={item.id} 
                    to={`/product/${item.tensp + '-' + item.id}`}
                    className="min-w-[140px] md:min-w-[180px] group transition-all"
                >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-slate-100">
                    <img src={item.hinhanhsp} className="w-full h-full object-cover transition duration-300 group-hover:scale-110 transition-duration-500" alt="" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 truncate group-hover:text-red-900">{item.tensp}</p>
                    <p className="text-sm font-black text-slate-900 mt-1">{item.giasp.toLocaleString()}₫</p>
                </NavLink>
                ))}
            </div>
        </div>
    )
}