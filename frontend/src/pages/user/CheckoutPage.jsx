import React, { useState } from "react";

const CheckoutPage = () => {
  document.title = 'Đơn hàng |H2T Shopp';
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Progress Stepper - Nâng cấp trực quan */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-xs font-bold uppercase tracking-widest">Giỏ hàng</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className="flex items-center gap-2 text-red-900">
            <span className="w-6 h-6 rounded-full bg-red-900 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-red-200">2</span>
            <span className="text-xs font-bold uppercase tracking-widest">Thanh toán</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-bold uppercase tracking-widest">Hoàn tất</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Shipping Section - Card thiết kế lại */}
            <section className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 p-8 md:p-10 transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-4">
                  <span className="bg-red-50 text-red-900 p-2.5 rounded-2xl">
                    <svg xmlns="www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  Địa chỉ nhận hàng
                </h3>
                <button className="px-4 py-2 rounded-xl text-sm font-bold text-red-900 bg-red-50 hover:bg-red-100 transition-all">Thay đổi</button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative p-6 rounded-[24px] border-2 border-red-900 bg-gradient-to-br from-red-50/50 to-white shadow-sm overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 text-red-100/50 group-hover:scale-110 transition-transform">
                    <svg xmlns="www.w3.org" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="px-2 py-0.5 bg-red-900 text-white text-[10px] font-black uppercase rounded-md">Mặc định</span>
                       <p className="font-bold text-slate-800">Nguyễn Văn A</p>
                    </div>
                    <p className="text-sm font-bold text-slate-600 mb-1">0912 345 678</p>
                    <p className="text-sm text-slate-400 leading-relaxed">123 Đường ABC, Phường Long Bình, TP. Biên Hòa, Đồng Nai</p>
                  </div>
                </div>

                <button className="p-6 rounded-[24px] border-2 border-dashed border-slate-100 text-slate-400 hover:border-red-200 hover:bg-red-50/20 transition-all flex flex-col items-center justify-center gap-3 group">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-red-300 group-hover:text-red-900 transition-all">
                    <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Thêm địa chỉ mới</span>
                </button>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 p-8 md:p-10">
              <h3 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-4 mb-8">
                <span className="bg-red-50 text-red-900 p-2.5 rounded-2xl">
                  <svg xmlns="www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </span>
                Phương thức thanh toán
              </h3>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { id: "card", label: "Thẻ tín dụng", icon: "💳", desc: "Visa, Mastercard" },
                  { id: "momo", label: "Ví MoMo", icon: "📱", desc: "Quét mã nhanh" },
                  { id: "cod", label: "Tiền mặt", icon: "💵", desc: "Khi nhận hàng" },
                ].map((m) => (
                  <label key={m.id} className="relative cursor-pointer group">
                    <input
                      type="radio"
                      className="peer hidden"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                    />
                    <div className="h-full p-5 rounded-[24px] border-2 border-slate-50 bg-slate-50/30 text-center transition-all duration-300 peer-checked:border-red-900 peer-checked:bg-white peer-checked:shadow-xl peer-checked:shadow-red-900/5 group-hover:bg-white">
                      <div className="text-3xl mb-3 grayscale group-hover:grayscale-0 peer-checked:grayscale-0 transition-all">{m.icon}</div>
                      <p className="text-sm font-black text-slate-800 mb-1">{m.label}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="mt-8 p-8 bg-slate-50/50 border border-slate-100 rounded-[24px] space-y-5 animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số thẻ tín dụng</label>
                    <input
                      className="w-full px-6 py-4 rounded-xl border-none shadow-inner bg-white focus:ring-2 focus:ring-red-900 outline-none font-medium transition-all"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hết hạn</label>
                       <input className="w-full px-6 py-4 rounded-xl border-none shadow-inner bg-white outline-none" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVC / CVV</label>
                       <input className="w-full px-6 py-4 rounded-xl border-none shadow-inner bg-white outline-none" placeholder="•••" />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN - Sticky Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[32px] shadow-2xl p-8 sticky top-8 text-white overflow-hidden">
              {/* Trang trí nền */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/20 rounded-full blur-3xl"></div>
              
              <h4 className="text-xl font-black mb-8 relative z-10">Tóm tắt đơn hàng</h4>

              {/* Product List */}
              <div className="relative z-10 space-y-6 mb-8">
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-white/10 rounded-[20px] overflow-hidden backdrop-blur-md p-2">
                    <img src="https://picsum.photos/100" className="w-full h-full object-cover rounded-lg" alt="product" />
                    <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-full ring-4 ring-[#111827]">x1</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">iPhone 16 Pro Max</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Titanium Sa Mạc</p>
                    <p className="text-base font-black text-red-500 mt-1">34.990.000₫</p>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="relative z-10 mb-8 group">
                <input
                  className="w-full pl-5 pr-24 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-red-900 outline-none transition-all text-sm font-medium"
                  placeholder="Mã ưu đãi"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-900 hover:bg-red-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Áp dụng
                </button>
              </div>

              {/* Billing Details */}
              <div className="relative z-10 space-y-4 border-t border-white/5 pt-8 text-sm">
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Giá tạm tính</span>
                  <span className="text-white">34.990.000₫</span>
                </div>
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Phí vận chuyển</span>
                  <span className="text-emerald-400 font-black tracking-widest uppercase text-[10px]">Miễn phí</span>
                </div>
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Giảm giá</span>
                  <span className="text-red-500">-500.000₫</span>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-white/5 mt-4">
                  <span className="font-bold text-slate-400">Tổng thanh toán</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-red-500 drop-shadow-2xl">34.490.000₫</p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold mt-1 tracking-tighter">Đã bao gồm VAT 8%</p>
                  </div>
                </div>
              </div>

              {/* Main Action */}
              <button className="relative z-10 w-full mt-10 py-5 rounded-[24px] bg-red-900 hover:bg-red-800 text-white font-black text-lg transition-all active:scale-95 shadow-[0_20px_40px_rgba(153,27,27,0.3)] flex items-center justify-center gap-3 group">
                Xác nhận đơn hàng
                <svg className="group-hover:translate-x-1 transition-transform" xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-30 group hover:opacity-100 transition-opacity cursor-help">
                 <svg xmlns="www.w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                 <span className="text-[9px] font-black uppercase tracking-[0.2em]">SSL Secured Payment</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
