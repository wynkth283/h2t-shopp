import { NavLink } from "react-router-dom"
import RichTextEditor from "../components/RichText"
import '../App.css'
export default function PageNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white/0">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-red-200 select-none">404</h1>
                <div className="mt-5">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Có Lẽ Đã Thiếu Gì Đó !!?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </p>
                    <NavLink to={"/"}
                        className="px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 
                                transition font-medium"
                    >
                        Quay về trang chủ
                    </NavLink>
                </div>
            </div>
        </div>
    )
}