import { NavLink } from "react-router-dom"

export default function Breadcrumb({ category, tensp, ...props }) {
    return (
        <div className="max-w-6xl mx-auto px-4 pt-4 text-sm text-gray-500" {...props}>
            <NavLink to="/" className="hover:underline cursor-pointer">Trang chủ</NavLink>
            <span className="mx-1">/</span>
            <NavLink to={`/category/` + category} className="hover:underline cursor-pointer">{category}</NavLink>
            <span className="mx-1">/</span>
            <span className="text-gray-800">{tensp}</span>
        </div>
    )
}