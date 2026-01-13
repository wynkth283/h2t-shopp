import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import { linkTo } from "../../data/linkTo";

export default function AppFooter() {
    return (
        <footer className="bg-white border-t border-slate-100 mt-20 pt-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 pb-16">
                    {/* Cột 1: Thương hiệu & Social */}
                    <div className="space-y-6">
                        <Logo/>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Nền tảng mua sắm trực tuyến hàng đầu năm 2025. Chúng tôi mang đến trải nghiệm mua sắm thông minh, an toàn và tận tâm trên từng đơn hàng.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: "fa-facebook-f", color: "hover:bg-blue-600" },
                                { icon: "fa-instagram", color: "hover:bg-pink-600" },
                                { icon: "fa-twitter", color: "hover:bg-sky-500" },
                                { icon: "fa-youtube", color: "hover:bg-red-600" }
                            ].map((social, idx) => (
                                <a key={idx} href="#" className={`w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 ${social.color} hover:text-white transition-all duration-300 shadow-sm`}>
                                    <i className={`fa-brands ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Cột 2: Chính sách - Thiết kế Link hiện đại */}
                    <div>
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6">Chính sách</h2>
                        <ul className="space-y-4">
                            {["Bảo mật dữ liệu", "Đổi trả 30 ngày", "Thanh toán an toàn", "Vận chuyển hỏa tốc"].map((item, idx) => (
                                <li key={idx}>
                                    <NavLink to="/policy" className="group flex items-center gap-2 text-sm text-slate-500 hover:text-red-900 transition-all font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-red-900 transition-colors"></span>
                                        {item}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3: Hỗ trợ */}
                    <div>
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6">Liên kết nhanh</h2>
                        <ul className="space-y-4">
                            {linkTo.map((item, idx) => (
                                <li key={idx}>
                                    <NavLink to={'/#' + item.hashlink} className="group flex items-center gap-2 text-sm text-slate-500 hover:text-red-900 transition-all font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-red-900 transition-colors"></span>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 4: Newsletter & Contact */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6">Kết nối với H2T</h2>
                        <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-inner">
                            
                        </div>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3 text-xs text-slate-500 font-medium leading-relaxed">
                                <i className="fa-solid fa-location-dot text-red-900 mt-0.5"></i>
                                123 Đường ABC, Phường AB, TP. CD, Đồng Nai
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Minimalism */}
                <div className="border-t border-slate-100 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        © 2025 <span className="text-red-900 font-black">H2T SHOPP</span>. Đã đăng ký bản quyền.
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <i className="fa-brands fa-cc-visa text-2xl"></i>
                            <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                            <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
                        <div className="flex gap-4 text-[11px] font-bold text-slate-400">
                            <NavLink to="/term" className="hover:text-red-900">Điều khoản</NavLink>
                            <NavLink to="/" className="hover:text-red-900">Bảo mật</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
