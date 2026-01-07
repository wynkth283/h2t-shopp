import React, { useState } from 'react';

const PolicyPage = () => {
    const [active, setActive] = useState('shipping');

    const policies = [
        { 
            id: 'shipping', 
            title: 'Chính sách vận chuyển', 
            icon: "fa-truck-fast",
            tag: "Logistics",
            content: 'H2T SHOPP hợp tác với các đơn vị vận chuyển hàng đầu như GHTK, Viettel Post. Hệ thống tự động tối ưu hóa lộ trình giúp thời gian giao hàng chỉ từ 2-4 ngày làm việc.' 
        },
        { 
            id: 'return', 
            title: 'Đổi trả & Hoàn tiền', 
            icon: "fa-rotate-left",
            tag: "After-sales",
            content: 'Sản phẩm lỗi do nhà sản xuất hoặc không đúng mô tả được đổi mới hoàn toàn trong vòng 7 ngày. Quy trình xử lý nhanh gọn qua mã vận đơn.' 
        },
        { 
            id: 'privacy', 
            title: 'Bảo mật thông tin', 
            icon: "fa-user-shield",
            tag: "Security",
            content: 'Chúng tôi áp dụng tiêu chuẩn mã hóa SSL/TLS mới nhất 2025. Cam kết tuyệt đối không chia sẻ dữ liệu cá nhân khách hàng cho bên thứ ba.' 
        },
        { 
            id: 'payment', 
            title: 'Thanh toán', 
            icon: "fa-credit-card",
            tag: "Financial",
            content: 'Đa dạng phương thức: Apple Pay, Google Pay, thẻ nội địa, chuyển khoản QR và thu hộ COD toàn quốc với tính bảo mật cao.' 
        },
    ];

    const activePolicy = policies.find(p => p.id === active);

    return (
        <div className="min-h-screen bg-[#fcfcfc] pb-20">
            {/* Header Section với hiệu ứng Blur & Gradient */}
            <div className="relative bg-slate-900 pt-32 pb-44 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Help Center • 2025</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        Trung tâm <br className="lg:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Chính sách</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                        Mọi thông tin về quyền lợi và trách nhiệm của bạn đều được minh bạch hóa tại đây. Chúng tôi luôn đồng hành cùng bạn.
                    </p>
                </div>
            </div>

            {/* Layout chính */}
            <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    
                    {/* Sidebar: Navigation */}
                    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
                        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] p-4">
                            <p className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-3">Chủ đề hỗ trợ</p>
                            <nav className="space-y-2">
                                {policies.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActive(item.id)}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group
                                            ${active === item.id
                                                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                                                : "text-slate-500 hover:bg-red-50 hover:text-red-900"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <i className={`fa-solid ${item.icon} text-lg ${active === item.id ? "text-red-400" : "text-slate-300 group-hover:text-red-900"}`}></i>
                                            <span className="font-bold text-[15px] tracking-tight">{item.title}</span>
                                        </div>
                                        <i className={`fa-solid fa-chevron-right text-[10px] transition-transform ${active === item.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}></i>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 w-full">
                        <div className="bg-white rounded-[40px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-16 min-h-[600px] relative overflow-hidden transition-all duration-500">
                            
                            {/* Animated Content */}
                            <div key={active} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        {activePolicy.tag}
                                    </span>
                                    <span className="text-slate-300 text-xs">•</span>
                                    <span className="text-slate-400 text-xs font-medium">Cập nhật: 25/12/2025</span>
                                </div>

                                <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">
                                    {activePolicy.title}
                                </h2>

                                <div className="prose prose-slate max-w-none">
                                    <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl mb-10 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                                            <i className="fa-solid fa-circle-info"></i>
                                        </div>
                                        <p className="text-slate-500 text-sm leading-relaxed italic">
                                            Lưu ý: Mọi giao dịch tại H2T SHOPP đều được bảo vệ bởi bộ luật thương mại điện tử 2025. Vui lòng kiểm tra kỹ tình trạng kiện hàng trước khi ký nhận.
                                        </p>
                                    </div>

                                    <div className="text-slate-600 text-lg leading-loose space-y-8 font-medium">
                                        <p className="first-letter:text-5xl first-letter:font-black first-letter:text-red-900 first-letter:mr-3 first-letter:float-left">
                                            {activePolicy.content}
                                        </p>
                                        <p>Để đảm bảo quyền lợi tối đa cho khách hàng, chúng tôi khuyến khích quý khách quay video đồng kiểm khi mở gói hàng. Đội ngũ CSKH luôn sẵn sàng lắng nghe mọi góp ý của bạn qua Hotline 24/7.</p>
                                    </div>

                                    {/* Feature Cards Group */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                                        {[
                                            { t: 'Xử lý thần tốc', d: 'Cam kết phản hồi trong 15 phút', i: 'fa-bolt' },
                                            { t: 'Hỗ trợ đa kênh', d: 'Zalo, Messenger, Hotline', i: 'fa-comments' },
                                            { t: 'Chính xác 100%', d: 'Thông tin minh bạch rõ ràng', i: 'fa-bullseye' },
                                            { t: 'Hài lòng tuyệt đối', d: 'Tất cả vì trải nghiệm khách hàng', i: 'fa-face-smile' }
                                        ].map((feat, i) => (
                                            <div key={i} className="group p-5 rounded-[24px] border border-slate-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-red-900 transition-colors">
                                                        <i className={`fa-solid ${feat.i}`}></i>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800">{feat.t}</p>
                                                        <p className="text-[11px] text-slate-400 font-bold">{feat.d}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Call to action phụ */}
                        <div className="mt-10 p-8 rounded-[32px] bg-red-950 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-red-900/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                            <div className="relative z-10 text-center md:text-left">
                                <p className="text-white font-black text-xl mb-1">Vẫn cần hỗ trợ thêm?</p>
                                <p className="text-red-200/60 text-sm">Gửi ngay tin nhắn cho bộ phận hỗ trợ kỹ thuật.</p>
                            </div>
                            <button className="relative z-10 px-8 py-4 bg-white text-red-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                                Liên hệ ngay
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;
