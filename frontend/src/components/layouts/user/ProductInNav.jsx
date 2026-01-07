import { NavLink } from "react-router-dom"
import { tinhgiamgia } from "../../../until/giasp_giamgiasp";
import { products } from "../../../data/Product";
import { cart } from "../../../data/Cart";
import { useCart } from "../../../context/CartProvider";


export default function ProductInNav() {
    const { itemcart } = useCart();
    const joinedCartProducts = itemcart.map(cartItem => {
        const productDetail = products.find(p => p.id === cartItem.id);
        return {
            ...productDetail,
            ...cartItem
        };
    });
    function gioihan_tensp(a, b) {
        const giatri_gh = a;
        const tenda_gh = (b && b.length > giatri_gh) 
        ? b.slice(0, giatri_gh) + "..."
        : b || ""
        return tenda_gh;
    }
    return (
        <div className="space-y-4 max-h-[360px] overflow-y-auto no-scrollbar">
            {
                joinedCartProducts.sort((a,b) => b.id - a.id).slice(0,2).map(i => (
                    <NavLink to={`/product/${i.slug + '-' + i.id}`} key={i.id} className="block group">
                        <div key={i.id} className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group-hover:bg-slate-50 active:scale-[0.98]">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={i.hinhanhsp} alt="product-img-cart" />
                            </div>
                            <div className="flex flex-1 flex-col min-w-0">
                                <h4 className="truncate text-sm font-bold text-slate-700 transition-colors group-hover:text-red-900">
                                    {gioihan_tensp(50, i.tensp)}
                                </h4>
                                {i.selectedVariants && (
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {i.selectedVariants.color && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded">
                                                {i.selectedVariants.color}
                                            </span>
                                        )}
                                        {i.selectedVariants.storage && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded">
                                                {i.selectedVariants.storage}
                                            </span>
                                        )}
                                        {i.selectedVariants.capacity && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded">
                                                {i.selectedVariants.capacity}
                                            </span>
                                        )}
                                    </div>
                                )}
                            
                                <div className="mt-1 flex flex-col gap-1">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-black text-red-900">
                                            {i.discountedPrice ? i.discountedPrice : tinhgiamgia(i.giasp, i.giamgia)}
                                        </span>
                                        <sup className="text-[10px] font-bold text-red-900 tracking-tighter">đ</sup>
                                    </div>
                                    <div className="text-[10px] font-medium text-slate-500">
                                        SL: x{i.slsp}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                                        Chi tiết
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            <svg 
                                xmlns="www.w3.org" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="text-red-900"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                            </div>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    );
}