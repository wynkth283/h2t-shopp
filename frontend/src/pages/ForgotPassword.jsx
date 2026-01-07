import { useState } from "react";
import { NavLink } from "react-router-dom";
import ImgFGP from "../assets/img/Forgot password.gif"
import SlideInRight from "../components/animation/SlideInRight";
import ContainerListSlide from "../components/animation/ContainerListSlide";
import ItemListSlideRight from "../components/animation/ItemListSlideRight";
import Logo from "../components/Logo";
import ButtonBackHome from "../components/ButtonBackHome";

export default function ForgotPassword() {
    const [identifier, setIdentifier] = useState("");
    const [sent, setSent] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!identifier) {
            alert("Vui lòng nhập email hoặc số điện thoại!");
            return;
        }

        window.location.href = "/otp";
        setSent(true);
    }

    return (
        <div className="min-h-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row rounded-xl h-screen overflow-hidden">
                    <ContainerListSlide className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center p-8 hidden md:block">
                        <ItemListSlideRight className="w-full h-full flex flex-col items-center justify-center">
                            <img
                                src={ImgFGP}
                                alt="Forgot password"
                                className="max-w-full"
                            />

                            <div className="text-center">
                                <ButtonBackHome />
                                <p className="text-sm text-slate-500 mt-1">
                                    Khôi phục mật khẩu nhanh chóng & an toàn
                                </p>
                            </div>
                        </ItemListSlideRight>
                    </ContainerListSlide>
                    <SlideInRight className="md:w-1/2 w-full flex items-center justify-center p-8">
                        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                            <h2 className="text-center text-2xl font-semibold mb-3 text-red-900">
                                Quên mật khẩu?
                            </h2>

                            <p className="text-center text-[12px] text-slate-500 mb-6">
                                Nhập email hoặc số điện thoại để nhận liên kết đặt lại mật khẩu
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-red-900/60 ml-1">
                                    Email hoặc Số điện thoại
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-red-900 transition-colors">
                                        <i className="fa-regular fa-envelope"></i>
                                    </span>
                                    <input  type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                                            placeholder="example@gmail.com" className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-900/10 focus:bg-white transition-all outline-none text-sm"/>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-red-900 hover:bg-red-700 text-white font-medium transition active:scale-[0.98]"
                                >
                                    Gửi yêu cầu
                                </button>
                            </form>
                            <p className="mt-6 text-center text-sm text-slate-500">
                                Nhớ mật khẩu rồi?{" "}
                                <NavLink to="/sign-in" className="text-red-900 font-bold hover:underline underline-offset-2">
                                    Đăng nhập
                                </NavLink>
                            </p>

                            <p className="mt-3 text-center text-xs text-slate-300">
                                Hệ thống bảo mật thông tin của bạn tuyệt đối an toàn
                            </p>
                        </div>
                    </SlideInRight>
                </div>
            </div>
        </div>
    );
}
