import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <footer>Main Layout Footer</footer>
        </div>
    );
}