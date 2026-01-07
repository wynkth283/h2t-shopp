import { useState } from "react";
import SlideInRight from "../components/animation/SlideInRight";
import ContainerListSlide from "../components/animation/ContainerListSlide";
import ItemListSlideRight from "../components/animation/ItemListSlideRight";

export default function HelpContact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [focusedField, setFocusedField] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* LEFT INFO: Typography & Contact Cards */}
                    <ContainerListSlide className="lg:w-1/2 w-full lg:sticky lg:top-10">
                        <ItemListSlideRight>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                                </span>
                                <span className="text-red-900 text-xs font-bold uppercase tracking-wider">Hỗ trợ trực tuyến 24/7</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                                Kết nối với <br/>
                                <span className="text-red-900">H2T SHOPP</span>
                            </h1>
                            <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">
                                Đội ngũ CSKH luôn sẵn sàng giải đáp mọi thắc mắc của bạn về sản phẩm và dịch vụ.
                            </p>
                        </ItemListSlideRight>

                        {/* Bento Grid Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Hotline", val: "1900 9999", icon: "fa-phone" },
                                { label: "Email", val: "support@h2t.vn", icon: "fa-envelope" },
                                { label: "Địa chỉ", val: "Quận 1, TP.HCM", icon: "fa-location-dot" },
                                { label: "Thời gian", val: "08:00 – 22:00", icon: "fa-clock" }
                            ].map((item, idx) => (
                                <ItemListSlideRight key={idx} className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:border-red-200 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 group-hover:bg-red-50 text-slate-400 group-hover:text-red-900 rounded-xl transition-colors">
                                            <i className={`fa-solid ${item.icon} text-lg`}></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-800 tracking-tight">{item.val}</p>
                                        </div>
                                    </div>
                                </ItemListSlideRight>
                            ))}
                        </div>
                    </ContainerListSlide>

                    {/* RIGHT FORM: Elevated Card Design */}
                    <SlideInRight className="lg:w-1/2 w-full">
                        <div className="bg-white rounded-xl shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <i className="fa-solid fa-paper-plane text-9xl -rotate-12"></i>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Yêu cầu hỗ trợ</h2>
                            <p className="text-slate-400 text-sm mb-8">Vui lòng điền đầy đủ thông tin bên dưới</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* NAME */}
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold transition-colors ${focusedField === 'name' ? 'text-red-900' : 'text-slate-500'}`}>
                                        HỌ VÀ TÊN
                                    </label>
                                    <div className="relative group">
                                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'text-red-900' : 'text-slate-400'}`}>
                                            <i className="fa-solid fa-user text-sm"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Nhập tên của bạn..."
                                            required
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-red-900/10 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold transition-colors ${focusedField === 'email' ? 'text-red-900' : 'text-slate-500'}`}>
                                        ĐỊA CHỈ EMAIL
                                    </label>
                                    <div className="relative group">
                                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-red-900' : 'text-slate-400'}`}>
                                            <i className="fa-solid fa-envelope text-sm"></i>
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="example@gmail.com"
                                            required
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-red-900/10 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* MESSAGE */}
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold transition-colors ${focusedField === 'message' ? 'text-red-900' : 'text-slate-500'}`}>
                                        NỘI DUNG CẦN GIÚP ĐỠ
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField('')}
                                        placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                        rows={4}
                                        required
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-900/10 focus:bg-white rounded-2xl py-4 px-5 text-sm outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    <span>Gửi yêu cầu</span>
                                    <i className="fa-solid fa-paper-plane text-xs"></i>
                                </button>
                            </form>

                            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400 italic">
                                <i className="fa-solid fa-shield-halved"></i>
                                Thông tin của bạn được bảo mật tuyệt đối theo tiêu chuẩn 2025
                            </div>
                        </div>
                    </SlideInRight>
                </div>
            </div>
        </div>
    );
}
