import { NavLink } from "react-router-dom";
import ProductInNav from "../../components/layouts/user/ProductInNav";
import { useCart } from "../../context/CartProvider";
import SearchBox from "../../components/layouts/user/SearchBox";
import Logo from "../../components/Logo";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import FadeDown from "../../components/animation/FadeDown";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { itemcart } = useCart();
    const tongspInNav = itemcart.reduce((total, product) =>
        total + parseInt(product.slsp), 0
    );
    const tongspInNavEmpty = tongspInNav === 0;

    return (
        <header className="w-full backdrop-blur-md border-b border-slate-100 relative z-50">
            <FadeDown className="bg-slate-900 text-slate-300 rounded-b-2xl">
                <FadeDown className="max-w-7xl mx-auto px-4 flex justify-center md:justify-between items-center h-10 text-[11px] font-medium tracking-wide">
                    <div className="hidden md:flex md:items-center gap-5">
                        <div className="opacity-70 uppercase tracking-widest">Kết nối</div>
                        <div className="flex gap-3 text-sm">
                            <div>
                                <i className="fa-brands fa-facebook-f hover:text-white transition-colors cursor-pointer"></i>
                            </div>
                            <div>
                                <i className="fa-brands fa-instagram hover:text-white transition-colors cursor-pointer"></i>
                            </div>
                            <div>
                                <i className="fa-brands fa-twitter hover:text-white transition-colors cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-6">
                        <div>
                            <NavLink to="/help-contact" className="hidden md:block hover:text-white transition-colors">Trợ giúp & Liên hệ</NavLink>
                        </div>
                        <div>
                            <NavLink to="/" className="md:hidden block hover:text-white transition-colors font-bold flex items-center gap-1">
                                <div className="px-2 py-1 bg-red-900 text-white rounded-full">H</div>
                                H2T
                                <span>SHOPP</span>
                            </NavLink>
                        </div>
                        {user ? (
                            <div>
                                <div className="flex justify-between gap-1">
                                    <NavLink 
                                        to="/profile" 
                                        className="flex items-center gap-1 pr-1 rounded-full 
                                                bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm
                                                hover:bg-red-900 hover:border-red-900 hover:shadow-md hover:shadow-red-900/20 
                                                transition-all duration-300 ease-out group"
                                    >
                                        <div className="relative rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-white/30 transition-all duration-300">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${user.userData.name || 'User'}&background=7f1d1d&color=fff&size=20`}
                                                alt="Avatar"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <span className="text-[11px] font-black tracking-tight text-slate-700 group-hover:text-white transition-colors duration-300">
                                            {user.userData.name || 'Khách hàng'}
                                        </span>
                                    </NavLink>
                                    <button
                                        onClick={() => { logout(); navigate('/'); }}
                                        className="hidden md:block bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full transition-all duration-300 shadow-lg shadow-red-900/20"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
                                    <div>
                                        <NavLink to="/sign-in" className="hover:text-white transition-colors">Đăng nhập</NavLink>
                                    </div>
                                    <div>
                                        <NavLink to="/register" className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full transition-all duration-300 shadow-lg shadow-red-900/20">
                                            Đăng ký
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </FadeDown>
            </FadeDown>
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="hidden md:flex flex-row items-center justify-between gap-8">
                    <div><Logo/></div>
                    <div className="block flex-1 max-w-2xl">
                        <SearchBox />
                    </div>
                    <div className="flex items-center md:gap-6">
                        <div className="relative group">
                            <NavLink to="/cart" className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all">
                                <i className="fa-solid fa-cart-shopping text-sm md:text-xl text-red-900"></i>  
                                {!tongspInNavEmpty && (
                                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-600 text-white text-[10px] font-black rounded-full shadow-lg border-2 border-white animate-in zoom-in">
                                        {tongspInNav}
                                    </span>
                                )}
                            </NavLink>
                            {
                                user ? (
                                    <div className="absolute right-0 mt-4 w-70 md:w-96 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-100 overflow-hidden">
                                        {tongspInNavEmpty ? (
                                            <div className="p-5 md:p-10 text-center">
                                                <div className="w-15 h-15 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <i className="fa-solid fa-box-open text-3xl text-slate-200"></i>
                                                </div>
                                                <h4 className="text-slate-800 font-bold mb-1">Giỏ hàng trống</h4>
                                            </div>
                                        ) : (
                                            <div className="p-6">
                                                <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-4">
                                                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Giỏ hàng của bạn</h4>
                                                    <span className="text-[10px] bg-red-50 text-red-900 px-2 py-0.5 rounded-full font-bold">{tongspInNav} Sản phẩm</span>
                                                </div>
                                                
                                                <div className="space-y-4 max-h-[360px] overflow-y-auto no-scrollbar">
                                                <ProductInNav />
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-slate-50 flex gap-3">
                                                    <NavLink to="/cart" className="flex-1 bg-slate-900 text-white text-center py-3.5 rounded-xl text-xs font-black hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200">
                                                        XEM CHI TIẾT
                                                    </NavLink>
                                                    <NavLink to="/checkout" className="flex-1 bg-red-900 text-white text-center py-3.5 rounded-xl text-xs font-black hover:bg-red-800 transition-all active:scale-95 shadow-lg shadow-red-200">
                                                        THANH TOÁN
                                                    </NavLink>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (null)
                            }
                        </div>
                    </div>
                </div>
                <div className="block md:hidden m-4"></div>
                <div className="md:hidden flex gap-2 items-center">
                    <div className="block flex-1 max-w-2xl">
                        <SearchBox />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <NavLink to="/cart" className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all">
                                <i className="fa-solid fa-cart-shopping text-sm md:text-xl text-red-900"></i>  
                                {!tongspInNavEmpty && (
                                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-600 text-white text-[10px] font-black rounded-full shadow-lg border-2 border-white animate-in zoom-in">
                                        {tongspInNav}
                                    </span>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
