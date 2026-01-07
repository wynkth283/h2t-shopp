import React, { useState } from 'react';
import Sidebar from '../../components/pages/user/ProfilePage/Sidebar';
import AccountSection from '../../components/pages/user/ProfilePage/AccountSection/AccountSection';
import OrderSection from '../../components/pages/user/ProfilePage/OrderSection/OrderSection';
import AddressSection from '../../components/pages/user/ProfilePage/AddressSection/AddressSection';

const ProfilePage = () => {
    document.title = 'Thông tin cá nhân | H2T Shopp';
    const [activeSection, setActiveSection] = useState('account');
    
    // Password state
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const [errors, setErrors] = useState({});


    const validatePassword = () => {
        const newErrors = {};
        if (passwordData.newPassword.length < 6) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }
        return newErrors;
    };

  

    // Handle password change
    const handlePasswordChange = (e) => {
        e.preventDefault();
        const newErrors = validatePassword();

        if (!passwordData.oldPassword) {
            newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Đổi mật khẩu thành công!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setErrors({});
        }
    };


  
  return (
    <div className="min-h-screen">
        <div className="flex gap-5">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto">
            {/* Account Section */}
            {activeSection === 'account' && (
              <AccountSection errors={errors}/>
            )}

            {/* Orders Section */}
            {activeSection === 'orders' && (
              <OrderSection />
            )}

            {/* Addresses Section */}
            {activeSection === 'addresses' && (
              <AddressSection />
            )}


            {/* Password Section */}
            {activeSection === 'password' && (
  <div className="bg-white rounded-sm border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
    {/* Header Section với Icon Bảo mật */}
    <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
      <div className="p-3 bg-blue-600 text-white rounded-sm shadow-lg shadow-blue-100">
        <svg xmlns="www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div>
        <h4 className="text-xl font-extrabold text-slate-800">Bảo mật tài khoản</h4>
        <p className="text-sm text-slate-500">Thiết lập mật khẩu mạnh để bảo vệ thông tin của bạn</p>
      </div>
    </div>

    <form onSubmit={handlePasswordChange} className="p-8 space-y-6 max-w-xl">
      {/* Mật khẩu cũ */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Mật khẩu hiện tại</label>
        <div className="relative group">
          <input
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
            placeholder="••••••••"
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
            <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        {errors.oldPassword && <p className="text-red-500 text-xs font-bold mt-1 ml-1 tracking-wide">{errors.oldPassword}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mật khẩu mới */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Mật khẩu mới</label>
          <div className="relative">
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          {/* Thanh đo độ mạnh mật khẩu - Xu hướng 2025 */}
          <div className="flex gap-1 mt-2 px-1">
            <div className="h-1.5 flex-1 rounded-full bg-emerald-500"></div>
            <div className="h-1.5 flex-1 rounded-full bg-emerald-500"></div>
            <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase ml-2">Khá mạnh</span>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Xác nhận lại</label>
          <div className="relative">
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
        </div>
      </div>

      {/* Gợi ý bảo mật */}
      <div className="p-4 bg-amber-50 rounded-sm border border-amber-100 flex gap-3">
        <svg xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-bold">Lưu ý:</span> Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số để đảm bảo an toàn tuyệt đối cho tài khoản 2025 của bạn.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-sm font-black shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Cập nhật mật khẩu
          <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </form>
  </div>
)}

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;