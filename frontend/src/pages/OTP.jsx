import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SlideInRight from "../components/animation/SlideInRight";
import ContainerListSlide from "../components/animation/ContainerListSlide";
import ItemListSlideRight from "../components/animation/ItemListSlideRight";
import ImgOTP from "../assets/img/EnterOTP.gif"
import Logo from "../components/Logo";

export default function OTP() {
    const OTP_LENGTH = 6;
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < OTP_LENGTH) {
            alert("Vui lòng nhập đầy đủ mã OTP!");
            return;
        }
        console.log("Verify OTP:", code);
        alert("Xác thực OTP thành công!");
    };

    const resendOTP = () => {
        setTimer(60);
        alert("OTP mới đã được gửi!");
    };

    return (
        <div className="min-h-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row h-screen">
                    <ContainerListSlide className="md:w-1/2 w-full h-64 md:h-auto p-8 hidden md:block">
                        <ItemListSlideRight className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <img
                                src={ImgOTP}
                                alt="OTP verification"
                                className="max-w-full"
                            />

                            <div className="text-center absolute bottom-[80px]">
                                <div className="flex justify-center items-center group relative cursor-pointer">
                                    <div className="transition-all duration-500 transform group-hover:scale-110 group-active:scale-95">
                                        <Logo />
                                        <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 blur-xl rounded-full transition-all duration-500 -z-10"></div>
                                    </div>
                                    <div className="
                                        absolute left-full ml-4 top-1/2 -translate-y-1/2 
                                        whitespace-nowrap pointer-events-none z-20
                                        px-3 py-1.5 rounded-xl
                                        bg-slate-900/90 backdrop-blur-md text-white
                                        border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                                        text-[11px] font-bold uppercase tracking-wider
                                        
                                        /* Hiệu ứng xuất hiện mượt mà: Slide + Fade */
                                        opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                                        transition-all duration-300 ease-out
                                    ">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-house-chimney text-[10px] text-red-400"></i>
                                            Về trang chủ
                                        </div>
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900/90"></div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500 mt-1">
                                    Bảo mật hai lớp • An toàn tuyệt đối
                                </p>
                            </div>
                        </ItemListSlideRight>
                    </ContainerListSlide>
                    <SlideInRight className="md:w-1/2 w-full flex items-center justify-center p-8">
                        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                            <h2 className="text-center text-2xl font-semibold mb-3 text-red-900">
                                Xác thực OTP
                            </h2>

                            <p className="text-center text-sm text-slate-500 mb-6">
                                Nhập mã OTP gồm 6 chữ số đã được gửi cho bạn
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="flex justify-center gap-2 sm:gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-black rounded-2xl border-2 transition-all outline-none
                                                ${digit 
                                                    ? "border-red-900 bg-white text-red-900 shadow-[0_0_15px_rgba(153,27,27,0.1)]" 
                                                    : "border-slate-100 bg-slate-50 focus:border-red-900/30 text-slate-900"
                                                }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 flex items-center gap-2 shadow-sm">
                                        <i className={`fa-solid fa-clock text-[10px] ${timer > 0 ? "text-red-600 animate-pulse" : "text-slate-300"}`}></i>
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
                                            {timer > 0 ? (
                                                <>Gửi lại sau <span className="text-red-900">{timer}s</span></>
                                            ) : (
                                                "Đã hết thời gian"
                                            )}
                                        </span>
                                    </div>
                                    
                                    {timer === 0 && (
                                        <button
                                            type="button"
                                            onClick={resendOTP}
                                            className="text-sm text-red-900 hover:text-red-700 font-bold underline decoration-2 underline-offset-4 transition-all"
                                        >
                                            Gửi lại mã mới
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-2xl bg-red-900 hover:bg-red-800 text-white font-bold text-sm tracking-widest shadow-[0_10px_20px_rgba(153,27,27,0.2)] hover:shadow-[0_15px_25px_rgba(153,27,27,0.3)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    XÁC NHẬN
                                </button>
                            </form>

                            <div className="pt-8 border-t border-slate-50 text-center space-y-3">
                                <p className="text-xs text-slate-400 font-medium">
                                    Thông tin liên lạc bị sai?{" "}
                                    <a href="/forgot-password" className="text-red-900 font-bold hover:underline underline-offset-2">
                                        Thay đổi tại đây
                                    </a>
                                </p>
                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300 uppercase tracking-[0.1em]">
                                    <i className="fa-solid fa-lock"></i>
                                    Bảo mật tuyệt đối bởi H2T SHOPP
                                </div>
                            </div>
                        </div>
                    </SlideInRight>
                </div>
            </div>
        </div>
    );
}
