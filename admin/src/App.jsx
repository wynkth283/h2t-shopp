import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}