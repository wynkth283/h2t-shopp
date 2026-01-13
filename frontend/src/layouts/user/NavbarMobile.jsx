import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Facebook, Instagram, Twitter, ChevronRight, Sidebar } from 'lucide-react';
import Logo from '../../components/Logo';

export default function NavbarMobile() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Đăng nhập', href: '/sign-in' },
        { name: 'Đăng ký', href: '/register' },
        { name: 'Đăng xuất', href: '/logout' },
        { name: 'Trợ giúp & Liên hệ', href: '/contact' },
    ];

    const mxh = [
        { name: 'Facebook', href: 'https://www.facebook.com', icon: <Facebook size={20} /> },
        { name: 'Twitter', href: 'https://www.twitter.com', icon: <Twitter size={20} /> },
        { name: 'Instagram', href: 'https://www.instagram.com', icon: <Instagram size={20} /> },
    ]
  return (
    <nav className="block md:hidden bg-gray-50 relative w-full right-0 top-0 z-90">
        <div className="flex mt-5 items-center justify-between px-6 bg-gray-50">
            <div className="block md:hidden">
                <Logo />
            </div>
            <div className="md:hidden flex items-center text-right justify-end ">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
                >
                    <Sidebar size={28} />
                </button>
            </div>
        </div>
        {/* Mobile Menu Overlay */}
        <div className={`fixed w-full top-0 md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-dvh opacity-100 right-[0px]' : 'max-h-0 opacity-0 right-full'} overflow-hidden bg-gray-50`}>
            <div>
                <div className="bg-gray-50 flex justify-between h-20 items-center px-6 border-b border-gray-50">
                    <NavLink to="/" className="group flex items-center gap-3 relative outline-none">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-red-800 to-red-950 text-white w-11 h-11 flex items-center justify-center rounded-full
                                            shadow-[0_8px_16px_-6px_rgba(153,27,27,0.5)] 
                                            group-hover:shadow-[0_12px_20px_-8px_rgba(153,27,27,0.7)]
                                            group-hover:-rotate-6 group-hover:scale-105 
                                            transition-all duration-300 ease-out">
                            <span className="font-black text-2xl tracking-tighter">H</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center -space-y-1">
                            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-red-950 transition-colors">
                                H2T
                                <span className="text-red-800 relative">
                                    SHOPP
                                </span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase group-hover:text-red-700 transition-colors">
                                Premium Store
                            </span>
                        </div>
                    </NavLink>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-900 hover:text-red-600 transition-all hover:cursor-pointer focus:outline-none"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="bg-gray-50 flex flex-col justify-between px-6">
                    <nav className="flex-1">
                        <div className="flex flex-col">
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="group relative flex justify-between items-center py-5 border-b border-gray-100/80 transition-all duration-300 active:bg-gray-50 rounded-xl px-2"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-lg font-bold text-gray-800 group-hover:text-red-600 group-hover:translate-x-2 transition-all duration-300">
                                            {link.name}
                                        </span>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-2 transition-colors">
                                        <ChevronRight className="text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all" size={18} />
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                    <div className="mt-8 space-y-8">
                        <div className="space-y-4">
                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kết nối với chúng tôi</p>
                            <div className="flex justify-center items-center gap-5">
                                {mxh.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-500 shadow-sm hover:shadow-red-200 hover:-translate-y-1"
                                        aria-label={social.name}
                                    >
                                        <span className="z-10">{social.icon}</span>
                                        <div className="absolute inset-0 rounded-2xl bg-red-600 scale-0 group-hover:scale-100 transition-transform duration-500 -z-0"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="text-center pb-4">
                            <p className="text-[10px] text-gray-400">© 2026 H2TSHOPP. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};
