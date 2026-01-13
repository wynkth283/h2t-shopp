import Navbar from './user/Navbar';
import Footer from './user/Footer';
import ButtonOnTop from '../components/ButtonOnTop';
import { Outlet } from 'react-router-dom';
import NavbarMobile from './user/NavbarMobile';

export default function MainLayout() {
    return (
        <>
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