import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/user/HomePage'

export default function Route() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}