import ContainerListSlide from "../../../animation/ContainerListSlide";
import ItemListSlideLeft from "../../../animation/ItemListSlideLeft";
import { useAuth } from "../../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeSection, setActiveSection }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const navItem = [
        {
            label: 'Tài khoản',
            icon: 'fas fa-user',
            active: 'account',
        },
        {
            label: 'Đơn hàng',
            icon: 'fas fa-shopping-bag',
            active: 'orders',
        },
        {
            label: 'Địa chỉ',
            icon: 'fas fa-map-marker-alt',
            active: 'addresses',
        },
        {
            label: 'Đổi mật khẩu',
            icon: 'fas fa-lock',
            active: 'password',
        },
        {
            label: 'Đăng xuất',
            icon: 'fas fa-sign-out-alt',
            active: 'logout',
        }
    ]
    return (
        <aside className="sticky top-24 inset-y-0 left-0 z-40 w-64 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-full">
            <div className="flex flex-col ">
                <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-4 space-y-2">
                    <div className="px-4 py-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Trung tâm cá nhân</p>
                    </div>

                    <ContainerListSlide className="flex-1 space-y-1.5">
                        {navItem.map((item, index) => {
                            const isActive = activeSection === item.active;
                            const isLogout = item.active === 'logout';

                            return (
                                <ItemListSlideLeft key={index} className="relative group">
                                    <button
                                        onClick={() => {
                                            if (isLogout) {
                                                logout();
                                                navigate('/');
                                            } else {
                                                setActiveSection(item.active);
                                            }
                                        }}
                                        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group/btn ${
                                            isActive 
                                            ? 'bg-red-50 text-red-900 shadow-sm' 
                                            : isLogout
                                                ? 'text-slate-400 hover:bg-red-50 hover:text-red-600'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
                                            isActive 
                                            ? 'bg-red-900 text-white shadow-lg shadow-red-900/30' 
                                            : 'bg-slate-100 text-slate-400 group-hover/btn:bg-white group-hover/btn:text-slate-700 shadow-inner'
                                        }`}>
                                            <i className={`${item.icon} text-sm`}></i>
                                        </div>

                                        <span className={`text-sm font-bold tracking-tight transition-colors ${
                                            isActive ? 'font-black' : 'font-semibold'
                                        }`}>
                                            {item.label}
                                        </span>
                                        {!isLogout && !isActive && (
                                            <svg xmlns="www.w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
                                        )}
                                    </button>
                                </ItemListSlideLeft>
                            );
                        })}
                    </ContainerListSlide>
                    <div className="mt-6 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl relative overflow-hidden group cursor-pointer shadow-xl shadow-slate-200">
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Hạng thành viên</p>
                            <p className="text-white font-black text-sm uppercase">Bạc (Silver)</p>
                            <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                                <div className="w-2/3 h-full bg-red-500"></div>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-2">Cần 1.250 điểm để lên Vàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

    );
}