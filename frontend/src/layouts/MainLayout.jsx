import Navbar from './user/Navbar';
import Footer from './user/Footer';
import ButtonOnTop from '../components/ButtonOnTop';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <div className="lg:hidden fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-white text-xl font-semibold mb-2">Không hỗ trợ thiết bị di động</h1>
                    <p className="text-slate-400 max-w-xs mx-auto">
                        Hệ thống quản trị yêu cầu không gian làm việc rộng để hiển thị đầy đủ dữ liệu.
                    </p>
                </div>
            </div>

            <div className="font-sans min-h-screen transition-colors container mx-auto px-0 lg:px-4 xl:px-[100px] scroll-auto block xl:block lg:block">
                <Navbar></Navbar>
                <main>
                    <Outlet />
                </main>
                <Footer></Footer>
                <ButtonOnTop></ButtonOnTop>
            </div>
        </>
    );
}