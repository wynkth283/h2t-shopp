import { useState } from "react";
import ContainerListSlide from "../../../../animation/ContainerListSlide";
import ItemListSlideDown from "../../../../animation/ItemListSlideDown";
import Img from "../../../../../assets/img/bb-white.jpg"
export default function AccountSection({errors}) {
    // User data state
    const [userData, setUserData] = useState({
        fullName: 'Huỳnh Hưng Thịnh',
        email: 'wynkth283@gmail.com',
        phone: '0912345678',
        dob: '2003-11-28',
        gender: 'male',
        avatar: 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/465/avatar-trang-1.jpg'
    });
    // Handle profile update
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const newErrors = {};
        
        if (!userData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ tên';
        }
        if (!validateEmail(userData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!userData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Cập nhật thông tin thành công!');
            setErrors({});
        }
    };
    // Handle avatar upload
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <ContainerListSlide className="space-y-6">
            {/* Profile Header */}
            <ItemListSlideDown>
            <div className="relative overflow-hidden rounded-lg p-8 transition-all shadow-lg">
                <div className="relative flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">                        
                        <div className="relative">
                            <img src={`${userData.avatar}`} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" />
                            
                            <label className="absolute bottom-1 right-1 bg-white text-slate-700 p-2.5 rounded-xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all border border-slate-100 hover:text-red-600">
                                <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                                <input type="file" accept="image/*" onChange={handleAvatarChange}  className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                {userData.fullName}
                            </h3>
                            <span className="inline-flex items-center gap-1 w-fit mx-auto sm:mx-0 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider rounded-sm border border-red-100">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Hội viên
                            </span>
                        </div>
                        
                        <p className="text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                            <svg xmlns="www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            {userData.email}
                        </p>

                        {/* Thông số tóm tắt nhanh (Stats) */}
                        <div className="flex gap-6 pt-4 justify-center sm:justify-start border-t border-slate-500/50 mt-4">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Đơn hàng</p>
                                <p className="text-lg font-bold text-slate-700">12</p>
                            </div>
                            <div className="w-px h-8 bg-slate-100 self-center"></div>
                            {/* <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Tích điểm</p>
                                <p className="text-lg font-bold text-red-600">2,450</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            </ItemListSlideDown>


            {/* Edit Profile Form */}
            <ItemListSlideDown>
            <div className="rounded-sm border border-slate-100 shadow-lg overflow-hidden bg-white">
                {/* Header của Form */}
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                    <h4 className="text-xl font-bold text-slate-800">Cài đặt tài khoản</h4>
                    <p className="text-sm text-slate-500">Cập nhật thông tin cá nhân để nhận ưu đãi cá nhân hóa</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-8 space-y-6">
                    {/* Full Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Họ và tên</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                                <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <input
                                type="text"
                                value={userData.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none text-slate-700"
                                placeholder="Ví dụ: Nguyễn Văn A"
                            />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email liên hệ</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                                    <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none text-slate-700"
                                    placeholder="name@company.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Số điện thoại</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                                    <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none text-slate-700"
                                    placeholder="09xx xxx xxx"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Ngày sinh</label>
                        <input
                            type="date"
                            value={userData.dob}
                            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none text-slate-700 appearance-none"
                        />
                    </div>

                    {/* Gender Selection - Modern Radio Buttons */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Giới tính</label>
                        <div className="flex flex-wrap gap-4">
                            {['male', 'female', 'other'].map((option) => (
                            <label key={option} className="relative flex items-center group cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={option}
                                    checked={userData.gender === option}
                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    className="peer hidden"
                                />
                                <div className="px-5 py-2.5 rounded-sm border border-slate-200 bg-white text-slate-600 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600 peer-checked:shadow-md peer-checked:shadow-red-200 peer-checked:hover:bg-red-600 transition-all flex items-center gap-2 hover:bg-slate-50">
                                    <span className="capitalize">{option === 'male' ? 'Nam' : option === 'female' ? 'Nữ' : 'Khác'}</span>
                                </div>
                            </label>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-end gap-4">
                        <button type="button" className="px-6 py-3 text-slate-600 font-semibold hover:text-slate-800 transition">
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="relative group overflow-hidden px-8 py-3 bg-slate-900 text-white rounded-sm font-bold shadow-lg shadow-slate-200 hover:shadow-xl hover:bg-black transition-all active:scale-95"
                        >
                            <span className="relative z-10">Lưu thay đổi</span>
                            <div className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </form>
            </div>
            </ItemListSlideDown>
        </ContainerListSlide>
    );
}