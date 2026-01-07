import { useState } from "react";
import { NavLink } from "react-router-dom";
import ImgLogin from "../assets/img/Signin.gif"
import SlideInRight from "../components/animation/SlideInRight";
import ContainerListSlide from "../components/animation/ContainerListSlide";
import ItemListSlideRight from "../components/animation/ItemListSlideRight";
import ButtonBackHome from "../components/ButtonBackHome";
import Notification from "../components/Notification";
import { users } from "../data/Users";
import { useAuth } from "../context/AuthProvider"

import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [show, setShow] = useState(false);
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        setShow(true);

        if(!email) {
            setType("error");
            setMsg("Vui lòng điền email!");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setType("error");
            setMsg("Email không hợp lệ!");
            return;
        }
        if(!password) {
            setType("error");
            setMsg("Vui lòng điền mật khẩu!");
            return;
        } 

        const foundUser = users.find(i => i.email === email && i.password === password);
        if (!foundUser) {
            setType("error");
            setMsg("Sai thông tin đăng nhập!");
            return;
        }
        
        const userData = {id: foundUser.id, name: foundUser.name, email: foundUser.email};
        window.localStorage.setItem("user", JSON.stringify(userData));
        login({userData});
        setType("success");
        setMsg("Đăng nhập thành công!");

        navigate("/");
        return;
    }
return (
    <div className="min-h-screen h-screen flex items-center justify-center">
        {show && (<Notification type={ type } message={ msg } onClose={()=> setShow(false)}></Notification>)}
        <div className="w-full max-w-6xl mx-auto shadow-none">
            <div className="flex flex-col md:flex-row rounded-xl h-screen">
                <ContainerListSlide className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center p-8 hidden md:block xl:block">
                    <ItemListSlideRight
                        className="w-full h-full flex flex-col items-center justify-center gap-4"
                        aria-hidden="true"
                        >
                        <img
                            src={ImgLogin}
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

                <SlideInRight className="md:w-1/2 w-full flex items-center justify-center p-8">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
                        <h2 className="text-center text-2xl font-semibold mb-6 text-red-900">Đăng nhập tài khoản</h2>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60 ml-1">
                                    Email hoặc Số điện thoại
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                        <i className="fa-regular fa-envelope"></i>
                                    </span>
                                    <input
                                        tabIndex={1}
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60">
                                        Mật khẩu
                                    </label>
                                    <NavLink to="/forgot-password" size="xs" className="text-[11px] font-bold text-slate-400 hover:text-red-900 transition-colors uppercase tracking-tighter">
                                        Quên?
                                    </NavLink>
                                </div>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                        <i className="fa fa-key"></i>
                                    </span>
                                    <input
                                        tabIndex={2}
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="block w-full pl-11 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword((s) => !s)} 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                                    >
                                        <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </button>
                                </div>
                            </div>
                            <button 
                                tabIndex={3}
                                type="submit" 
                                className="w-full py-4 rounded-2xl bg-red-900 hover:bg-red-800 text-white font-bold text-sm tracking-wide shadow-[0_10px_20px_rgba(153,27,27,0.2)] hover:shadow-[0_15px_25px_rgba(153,27,27,0.3)] transition-all transform active:scale-[0.98]"
                            >
                                Đăng nhập
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-slate-100" />
                                    <div className="text-xs text-slate-400">Hoặc</div>
                                <div className="flex-1 h-px bg-slate-100" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 hover:shadow-sm transition hover:-translate-y-0.5" onClick={() => alert("Login with Google (demo)")} aria-label="Đăng nhập với Google" >
                                        <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M533.5 278.4c0-17.9-1.4-35-4.1-51.6H272.1v97.8h147.2c-6.3 34.5-25.4 63.7-54.4 83.3v68h87.9c51.4-47.3 81.7-117.3 81.7-197.5z" fill="#4285F4"/>
                                        <path d="M272.1 544.3c73.4 0 135-24.3 180-66l-87.9-68c-24.4 16.4-55.6 26-92.1 26-70.9 0-131-47.8-152.4-112.1h-90.3v70.7c44.9 88.2 137.9 149.5 242.7 149.5z" fill="#34A853"/>
                                        <path d="M119.7 329.2c-10.8-32.4-10.8-67.6 0-100l-90.3-70.7c-39.6 79.1-39.6 172.9 0 252z" fill="#FBBC05"/>
                                        <path d="M272.1 108.1c39.9-.6 78.5 14.2 107.6 40.8l80.6-80.6C409.7 24.7 347.9-.3 272.1 0 167.3 0 74.3 61.3 29.4 149.5l90.3 70.7C141.1 155.9 201.2 108.1 272.1 108.1z" fill="#EA4335"/>
                                        </svg>
                                    <span className="text-sm text-slate-700">Google</span>
                                </button>

                                <button type="button" className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 hover:shadow-sm transition hover:-translate-y-0.5" onClick={() => alert("Login with Facebook (demo)")} aria-label="Đăng nhập với Facebook" >
                                    <svg className="w-5 h-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.25 10.44 22v-7.01H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.92h-2.3V22C18.34 21.25 22 17.1 22 12.07z" />
                                    </svg>
                                    <span className="text-sm text-slate-700">Facebook</span>
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500"> Chưa có tài khoản?{" "}
                            <NavLink to="/register" className="text-red-900 font-bold hover:underline underline-offset-2">Đăng ký ngay</NavLink>
                        </p>
                        <p className="mt-3 text-center text-xs text-slate-300">
                            Bằng việc tiếp tục bạn đồng ý với Điều khoản & Chính sách bảo mật
                        </p>
                    </div>
                </SlideInRight>
            </div>
        </div>
    </div>
  );
}
