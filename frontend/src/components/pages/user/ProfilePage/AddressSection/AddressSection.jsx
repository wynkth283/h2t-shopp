import { useState } from "react";
import { address } from "../../../../../data/Address";
import { useAuth } from "../../../../../context/AuthProvider";
export default function AddressSection() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState(address.filter(addr => addr.idnd === user.userData.id));
    const [newAddress, setNewAddress] = useState({
        name: '',
        province: '',
        district: '',
        detail: ''
    });


    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setNewAddress({
            name: address.name,
            province: address.province,
            district: address.district,
            detail: address.detail
        });
        setShowAddressModal(true);
    };

    const handleDeleteAddress = (id) => {
        if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    const handleSetDefaultAddress = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Handle address operations
    const handleAddAddress = () => {
        if (!newAddress.name || !newAddress.province || !newAddress.district || !newAddress.detail) {
            alert('Vui lòng điền đầy đủ thông tin địa chỉ');
            return;
        }

        if (editingAddress) {
            setAddresses(addresses.map(addr => 
                addr.id === editingAddress.id 
                ? { ...newAddress, id: addr.id, isDefault: addr.isDefault }
                : addr
        ));
        } else {
            setAddresses([...addresses, { ...newAddress, id: Date.now(), isDefault: false }]);
        }

        setNewAddress({ name: '', province: '', district: '', detail: '' });
        setShowAddressModal(false);
        setEditingAddress(null);
    };
    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
                    <div>
                        <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <svg xmlns="www.w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            Sổ địa chỉ
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">Quản lý các địa điểm nhận hàng của bạn</p>
                    </div>
                    <button
                        onClick={() => { setShowAddressModal(true); setEditingAddress(null); setNewAddress({ name: '', province: '', district: '', detail: '' }); }}
                        className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-sm hover:bg-red-600 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-red-200"
                    >
                        <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform"><path d="M12 5v14M5 12h14"/></svg>
                        <span className="font-bold text-sm">Thêm địa chỉ mới</span>
                    </button>
                </div>

                {/* Address Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                    <div key={address.id} className={`relative group bg-white border-2 rounded-sm p-5 transition-all duration-300 ${ address.isDefault ? 'border-red-500 shadow-md shadow-red-50' : 'border-slate-50 hover:border-slate-200' }`}
                    >
                        {address.isDefault && (
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                Mặc định
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-slate-50 rounded-sm group-hover:bg-red-50 transition-colors">
                                <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-red-600"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditAddress(address)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all">
                                    <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                </button>
                                {!address.isDefault && (
                                <button onClick={() => handleDeleteAddress(address.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all">
                                    <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="font-bold text-slate-800 text-lg">{address.name}</p>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                {address.detail}
                            </p>
                            <p className="text-xs text-slate-400">
                                {address.district}, {address.province}
                            </p>
                        </div>

                        {!address.isDefault && (
                            <button onClick={() => handleSetDefaultAddress(address.id)} className="mt-4 w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-sm hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                                Thiết lập mặc định
                            </button>
                        )}
                    </div>
                    ))}
                </div>
            </div>
            {/* Address Modal */}
            {showAddressModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowAddressModal(false)} ></div>
                <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                    <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <div>
                            <h4 className="text-xl font-black text-slate-800">
                                {editingAddress ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}
                            </h4>
                            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-bold">Giao hàng tận tay</p>
                        </div>
                        <button onClick={() => setShowAddressModal(false)} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-all" >
                            <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <div className="p-8 space-y-5">
                        {/* Loại địa chỉ */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase ml-1">Tên gợi nhớ</label>
                            <div className="relative">
                                <input
                                type="text"
                                value={newAddress.name}
                                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none text-slate-700 font-medium"
                                placeholder="Ví dụ: Nhà riêng, Công ty..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-1">Tỉnh / Thành phố</label>
                                <input
                                type="text"
                                value={newAddress.province}
                                onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none"
                                placeholder="TP. Đồng Nai"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-1">Quận / Huyện</label>
                                <input
                                type="text"
                                value={newAddress.district}
                                onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none"
                                placeholder="Biên Hòa"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase ml-1">Địa chỉ chi tiết</label>
                            <textarea
                                value={newAddress.detail}
                                onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none resize-none"
                                placeholder="Số nhà, tên đường, phường/xã..."
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleAddAddress}
                                className="flex-[2] px-6 py-4 bg-red-600 text-white rounded-sm font-bold shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                {editingAddress ? 'Lưu thay đổi' : 'Xác nhận thêm'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}