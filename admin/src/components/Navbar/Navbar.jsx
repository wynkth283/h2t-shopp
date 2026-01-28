import { NavLink } from "react-router-dom";
import { Menu, Sidebar,  } from "lucide-react";
import Logo from "../Logo";

export default function Navbar() {
    const nanLinks = [
        {label: "Dashboard", href: "/"},
        {label: "Users", href: "/users"},
        {label: "Products", href: "/products"},
    ];
    return (
        <nav className="absolute top-0 sm:relative bg-white shadow-sm w-full sm:w-80 p-4">
            <div className="flex items-center justify-between">
                <Logo />
                <Sidebar />
            </div>
            {
                nanLinks.map(link => (
                    <div>
                        <NavLink 
                            key={link.href} 
                            to={link.href}
                            className={({isActive}) => isActive ? 'font-bold' : ''}
                        >
                            {link.label}
                        </NavLink>
                    </div>
                ))
            }
        </nav>

    )
}