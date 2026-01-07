import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');

    if (!user) {
        window.location.href = "/sign-in";
        return ;
    }

    return children;
};

export default ProtectedRoute;
