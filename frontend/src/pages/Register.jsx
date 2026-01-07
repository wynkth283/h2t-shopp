import { useState } from "react";
import SlideInRight from "../components/animation/SlideInRight";
import ContainerListSlide from "../components/animation/ContainerListSlide";
import ItemListSlideRight from "../components/animation/ItemListSlideRight";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import ButtonBackHome from "../components/ButtonBackHome";

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmpassword, setShowConfirmpassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        console.log("Register:", { fullname, identifier, password });
        alert(`Đăng ký thành công cho: ${fullname}`);
    }

    return (
        <div className="min-h-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row rounded-xl h-screen">

                    {/* LEFT IMAGE */}
                    <ContainerListSlide className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center p-8 hidden md:block">
                        <ItemListSlideRight
                            className="w-full h-full flex flex-col items-center justify-center gap-4"
                            aria-hidden="true"
                            >
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                                alt="H2T SHOPP Login Illustration"
                                className="max-w-full"
                            />
                            <ItemListSlideRight className="text-center">
                                <ButtonBackHome />
                                <p className="text-sm text-slate-500 mt-1">
                                Mua sắm thông minh • Giá tốt mỗi ngày
                                </p>
                            </ItemListSlideRight>
                        </ItemListSlideRight>
                    </ContainerListSlide>

                    {/* RIGHT FORM */}
                    <SlideInRight className="md:w-1/2 w-full flex items-center justify-center p-8">
                        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transition-all">
                            <h2 className="text-center text-2xl font-semibold mb-6 text-red-900">
                                Tạo tài khoản mới
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60 ml-1">
                                        Họ và Tên
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                            <i className="fa fa-user text-sm"></i>
                                        </span>
                                        <input tabIndex={1} type="text" value={fullname} onChange={(e) => setFullname(e.target.value)}
                                                placeholder="Nhập họ và tên" className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60 ml-1">
                                        Email hoặc Số điện thoại
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                            <i className="fa-regular fa-envelope"></i>
                                        </span>
                                        <input tabIndex={2} type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                                                placeholder="example@gmail.com" className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60">
                                        Mật khẩu
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                            <i className="fa fa-key"></i>
                                        </span>
                                        <input
                                            tabIndex={3}
                                            type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="block w-full pl-11 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"
                                        />
                                        <button 
                                            type="button" onClick={() => setShowPassword((s) => !s)} 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                                        >
                                            <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                            <i className="fa fa-shield text-sm"></i>
                                        </span>
                                        <input
                                            tabIndex={4}
                                            type={showConfirmpassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="block w-full pl-11 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"
                                        />
                                        <button 
                                            type="button" onClick={() => setShowConfirmpassword((s) => !s)} 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                                        >
                                            <i className={`fa-regular ${showConfirmpassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    tabIndex={5}
                                    type="submit" 
                                    className="w-full py-4 rounded-2xl bg-red-900 hover:bg-red-800 text-white font-bold text-sm tracking-wide shadow-[0_10px_20px_rgba(153,27,27,0.2)] hover:shadow-[0_15px_25px_rgba(153,27,27,0.3)] transition-all transform active:scale-[0.98]"
                                >
                                    Đăng ký
                                </button>
                            </form>

                            {/* FOOTER */}
                            <p className="mt-6 text-center text-sm text-slate-500">
                                Đã có tài khoản?{" "}
                                <NavLink to="/sign-in" className="text-red-900 font-bold hover:underline underline-offset-2">
                                    Đăng nhập
                                </NavLink>
                            </p>

                            <p className="mt-3 text-center text-xs text-slate-300">
                                Bằng việc đăng ký, bạn đồng ý với Điều khoản & Chính sách bảo mật
                            </p>
                        </div>
                    </SlideInRight>
                </div>
            </div>
        </div>
    );
}
