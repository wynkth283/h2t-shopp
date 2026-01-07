import { useState } from "react";
import { don_hang } from "../../../../../data/Order";

export default function OrderSection() {
    const [activeTab, setActiveTab] = useState('Tất cả');

    const tabs = [
        { id: 'Tất cả', label: 'Tất cả', filter: () => don_hang },
        { id: 'Đã đặt hàng', label: 'Đã đặt hàng', filter: () => don_hang.filter(order => order.status === "Đã đặt hàng") },
        { id: 'Đang xử lý', label: 'Đang xử lý', filter: () => don_hang.filter(order => order.status === "Đang xử lý") },
        { id: 'Đang giao', label: 'Đang giao', filter: () => don_hang.filter(order => order.status === "Đang vận chuyển") },
        { id: 'Đã giao', label: 'Đã giao', filter: () => don_hang.filter(order => order.status === "Giao thành công") },
        { id: 'Đã hủy', label: 'Đã hủy', filter: () => don_hang.filter(order => order.status === "Đã hủy") }
    ];

    const filteredOrders = tabs.find(tab => tab.id === activeTab)?.filter() || don_hang;
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* HEADER SECTION */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight">Lịch sử giao dịch</h4>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Xuất hóa đơn</button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex gap-1 p-1 bg-slate-50 rounded-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
    
            {/* DANH SÁCH ĐƠN HÀNG */}
            <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                    <div key={order.iddonhang} className="group relative bg-white border border-slate-100 rounded-lg p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden">
                        
                        {/* TRẠNG THÁI & MÃ ĐƠN (Header đơn hàng) */}
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-dashed border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200">
                                    <svg xmlns="www.w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                </div>
                                <div>
                                    <p className="font-black text-slate-800 text-lg tracking-tighter">{order.madonhang}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{order.date}</p>
                                </div>
                            </div>
                        
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest ${
                                order.status === 'Giao thành công' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                order.status === 'Đang vận chuyển' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                order.status === 'Đang xử lý' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                order.status === 'Đã đặt hàng' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                order.status === 'Đã hủy' ? 'bg-red-50 text-red-600 border border-red-100' :
                                'bg-gray-50 text-gray-600 border border-gray-100'
                            }`}>
                                <span className={`relative flex h-2 w-2`}>
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                        order.status === 'Giao thành công' ? 'bg-emerald-400' :
                                        order.status === 'Đang vận chuyển' ? 'bg-blue-400' :
                                        order.status === 'Đang xử lý' ? 'bg-orange-400' :
                                        order.status === 'Đã đặt hàng' ? 'bg-yellow-400' :
                                        order.status === 'Đã hủy' ? 'bg-red-400' :
                                        'bg-gray-400'
                                    }`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                        order.status === 'Giao thành công' ? 'bg-emerald-500' :
                                        order.status === 'Đang vận chuyển' ? 'bg-blue-500' :
                                        order.status === 'Đang xử lý' ? 'bg-orange-500' :
                                        order.status === 'Đã đặt hàng' ? 'bg-yellow-500' :
                                        order.status === 'Đã hủy' ? 'bg-red-500' :
                                        'bg-gray-500'
                                    }`}></span>
                                </span>
                                {order.status}
                            </span>
                        </div>
        
                        {/* NỘI DUNG SẢN PHẨM & ACTIONS */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            
                            {/* Danh sách SP trong đơn */}
                            <div className="flex-1 space-y-6">
                                {order.products.map((product, index) => (
                                    <div key={index} className="flex items-center gap-6 group/item">
                                        <div className="relative shrink-0">
                                            <div className="absolute -inset-1 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-2xl blur opacity-25 group-hover/item:opacity-100 transition duration-500"></div>
                                            <img
                                                src={product.image}
                                                alt="Product"
                                                className="relative w-24 h-24 object-cover rounded-2xl border border-slate-100 shadow-sm"
                                            />
                                            <div className="absolute -top-2 -right-2 bg-red-900 text-white text-[10px] font-black px-2 py-0.5 rounded-lg ring-4 ring-white shadow-lg">
                                                x{product.quantity}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-bold text-slate-800 text-base group-hover/item:text-red-900 transition-colors cursor-pointer line-clamp-1">
                                                {product.name}
                                            </h5>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Phân loại: {product.category}</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <span className="text-xl font-black text-slate-900">{product.price.toLocaleString('vi-VN')}₫</span>
                                                <span className="text-xs text-slate-300 line-through font-bold">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
        
                            {/* KHỐI TỔNG TIỀN & NÚT HÀNH ĐỘNG */}
                            <div className="lg:pl-8 lg:border-l border-slate-50 flex flex-col md:flex-row lg:flex-col items-center md:justify-between lg:justify-start gap-6">
                                <div className="text-center lg:text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tổng thanh toán</p>
                                    <p className="text-3xl font-black text-red-900 tracking-tighter leading-none">
                                        {order.total.toLocaleString('vi-VN')}<span className="text-sm ml-0.5">₫</span>
                                    </p>
                                    <p className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center justify-center lg:justify-end gap-1">
                                        <svg xmlns="www.w3.org" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        Bảo mật bởi SSL
                                    </p>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <button className="flex-1 lg:w-40 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-black active:scale-95 transition-all">
                                        {order.status === 'Giao thành công' ? 'Mua lại' :
                                         order.status === 'Đang vận chuyển' ? 'Định vị đơn' :
                                         order.status === 'Đang xử lý' ? 'Theo dõi' :
                                         order.status === 'Đã đặt hàng' ? 'Hủy đơn' :
                                         order.status === 'Đã hủy' ? 'Đặt lại' :
                                         'Chi tiết'}
                                    </button>
                                    <button className="flex-1 lg:w-40 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* LIVE TRACKING (Chỉ hiện cho đơn đang giao) */}
                        {(order.status === 'Đang vận chuyển' || order.status === 'Đang xử lý') && order.shipper && (
                            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex -space-x-3">
                                    {order.shipper.avatars.map((avatar, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={avatar} alt="shipper" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">+1</div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-xs font-bold text-slate-700">
                                        Shipper <span className="text-blue-600">{order.shipper.name}</span> đang giao hàng tại khu vực <span className="font-black underline decoration-blue-200 decoration-2 underline-offset-4 uppercase">{order.shipper.location}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Dự kiến nhận hàng trong {order.shipper.estimatedTime}</p>
                                </div>
                                <button className="text-xs font-black text-blue-600 hover:underline px-4 py-2 bg-white rounded-xl shadow-sm border border-blue-50 transition-all">Xem bản đồ</button>
                            </div>
                        )}
                    </div>
                ))
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                        </div>
                        <p className="text-slate-500 font-bold">Không có đơn hàng nào</p>
                        <p className="text-slate-400 text-sm mt-1">Chưa có đơn hàng trong danh mục này</p>
                    </div>
                )}
            </div>
        </div>
    );
}
