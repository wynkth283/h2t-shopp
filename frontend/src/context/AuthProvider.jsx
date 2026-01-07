import { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser({userData});
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        <Navigate to="/" place />;
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);