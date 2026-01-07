import React, { useState } from 'react';

const TermSection = ({ title, children, isOpen, onClick, index }) => (
  <div className={`group border-b border-slate-100/80 last:border-0 transition-all duration-500 ${isOpen ? 'bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] z-10 relative rounded-3xl my-2' : ''}`}>
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-8 px-6 md:px-10 text-left outline-none"
    >
      <div className="flex items-center gap-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 ${isOpen ? 'bg-red-900 text-white rotate-0' : 'bg-slate-50 text-slate-300 -rotate-12 group-hover:rotate-0 group-hover:bg-red-50 group-hover:text-red-900'}`}>
          {index + 1}
        </div>
        <h3 className={`text-xl font-black tracking-tight transition-all duration-300 ${isOpen ? 'text-red-900' : 'text-slate-800'}`}>
          {title}
        </h3>
      </div>
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 border-red-900 text-red-900' : 'border-slate-100 text-slate-400 group-hover:border-red-200'}`}>
        <svg xmlns="www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </button>
    
    <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[1000px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
      <div className="px-6 md:px-28">
        <div className="h-px bg-gradient-to-r from-red-900/20 to-transparent mb-8"></div>
        <div className="text-slate-600 leading-relaxed text-base md:text-lg space-y-5 font-medium">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default function TermsOfService() {
  const [openIndex, setOpenIndex] = useState(0);

  const terms = [
    {
      title: "Chấp nhận điều khoản",
      content: (
        <>
          <p>Bằng việc truy cập và sử dụng hệ sinh thái <strong>H2T SHOPP</strong>, bạn mặc nhiên đồng ý tuân thủ các quy định nghiêm ngặt về an toàn thông tin và quy tắc ứng xử cộng đồng.</p>
          <div className="p-4 bg-red-50 border-l-4 border-red-900 rounded-r-xl text-sm italic">
            "Sự minh bạch là nền tảng của niềm tin giữa chúng tôi và bạn."
          </div>
          <p>Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải chính thức trên trang này vào năm 2025.</p>
        </>
      )
    },
    {
      title: "Tài khoản người dùng",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: "Bảo mật", d: "Chịu trách nhiệm hoàn toàn về mật khẩu và định danh cá nhân." },
            { t: "Trung thực", d: "Cung cấp thông tin chính xác khi thực hiện giao dịch." },
            { t: "Pháp lý", d: "H2T có quyền khóa tài khoản nếu phát hiện dấu hiệu xâm nhập lạ." },
            { t: "Giới hạn", d: "Mỗi cá nhân chỉ nên sở hữu một tài khoản định danh duy nhất." }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors">
              <span className="block font-black text-red-900 text-xs uppercase tracking-widest mb-1">{item.t}</span>
              <p className="text-sm leading-snug">{item.d}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Quyền sở hữu trí tuệ",
      content: (
        <p>Toàn bộ tài nguyên bao gồm: hình ảnh 4K, logo vector, văn bản sáng tạo và mã nguồn nền tảng đều thuộc bản quyền <strong>H2T SHOPP 2025</strong>. Bất kỳ hành vi trích xuất dữ liệu tự động (Crawl) trái phép nào cũng sẽ bị xử lý theo pháp luật hiện hành.</p>
      )
    },
    {
      title: "Trách nhiệm và Giới hạn",
      content: (
        <p>H2T SHOPP nỗ lực tối đa để đảm bảo trải nghiệm không gián đoạn. Tuy nhiên, chúng tôi không chịu trách nhiệm đối với các sự cố hạ tầng internet nằm ngoài tầm kiểm soát hoặc các sai sót do bên thứ ba cung cấp dịch vụ thanh toán.</p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-24 px-4 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 animate-bounce">
            <span className="w-2 h-2 bg-red-900 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Legal Documents 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
            Điều khoản <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-600">Dịch vụ</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Cập nhật cuối: 24 Tháng 12, 2025</p>
        </div>

        {/* MAIN INTERFACE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-8">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Danh mục chi tiết</h2>
            <div className="h-px flex-1 bg-slate-100 mx-8"></div>
            <button className="text-red-900 font-black text-xs uppercase tracking-widest hover:underline" onClick={() => setOpenIndex(0)}>Mở rộng tất cả</button>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-2 rounded-[2.5rem]">
            {terms.map((term, index) => (
              <TermSection
                key={index}
                index={index}
                title={term.title}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                {term.content}
              </TermSection>
            ))}
          </div>
        </div>

        {/* HELP CARD */}
        <div className="mt-20 p-12 rounded-[3rem] bg-slate-900 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Vẫn còn thắc mắc?</h2>
              <p className="text-slate-400 font-medium">Đội ngũ pháp lý của H2T sẵn sàng tư vấn và làm rõ mọi điểm nghi vấn trong bản thỏa thuận này.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all duration-500 shadow-xl"
                onClick={() => window.location.href = '/help-contact'}
              >
                Gửi yêu cầu
              </button>
              <button className="px-10 py-5 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all">
                Tải bản PDF
              </button>
            </div>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
            <span className="flex items-center gap-3 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-900 transition-colors"><i className="fa-solid fa-shield-halved"></i></div>
              Verified Security
            </span>
            <span className="flex items-center gap-3 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-900 transition-colors"><i className="fa-solid fa-scale-balanced"></i></div>
              Legal Compliance
            </span>
            <span className="flex items-center gap-3 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-900 transition-colors"><i className="fa-solid fa-user-lock"></i></div>
              Privacy Protected
            </span>
        </div>
      </div>
    </div>
  );
}
