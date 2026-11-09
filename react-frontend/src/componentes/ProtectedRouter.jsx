import {Navigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import admin_loader from "../assets/images/admin_loader.gif";
function ProtectedRouter({children , allowedRoles}) {

    const {user, loading} = useAuth();
    if (loading) return <div><img src={admin_loader}/></div>;
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !user.roles.some(role => allowedRoles.includes(role))) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRouter;