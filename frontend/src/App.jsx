import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/user/HomePage'
import ProductPage from './pages/user/ProductPage'
import CartPage from './pages/user/CartPage'
import SearchResult from './pages/user/SearchResult'
import ProdCategoryPage from './pages/user/ProdCategoryPage'
import PageNotFound from './pages/PageNotFound'
import ProdNewPage from './pages/user/ProdNewPage'
import ProdHoiVienPage from './pages/user/ProdHoiVienPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import OTP from './pages/OTP'
import HelpContact from './pages/ContactPage'
import Policy from './pages/Policy'
import ProfilePage from './pages/user/ProfilePage'
import CheckoutPage from './pages/user/CheckoutPage'
import TermsOfService from './pages/TermPage'
import { AuthProvider } from './context/AuthProvider'
import { CartProvider } from './context/CartProvider'
import ProtectedRoute from './components/ProtectedRoute'
import CategoriesPage from './pages/user/CategoriesPage'

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/sign-in" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                        <Route path="/otp" element={<OTP />}></Route>
        
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/product/:nameAndId" element={<ProductPage />} />
                            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                            <Route path="/search/:kw" element={<SearchResult />} />
                            <Route path="/category/:category" element={<ProdCategoryPage/>}></Route>
                            <Route path="/product/new" element={<ProdNewPage/>}></Route>
                            <Route path="/product/hoivien" element={<ProdHoiVienPage/>}></Route>
                            <Route path="/help-contact" element={<HelpContact/>}></Route>
                            <Route path="/policy" element={<Policy/>}></Route>
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
                            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}></Route>
                            <Route path="/term" element={<TermsOfService />}></Route>
                            <Route path="/categories" element={<CategoriesPage />}></Route>
                        </Route>
                        <Route path="/*" element={<PageNotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}