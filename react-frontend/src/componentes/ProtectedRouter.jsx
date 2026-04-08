import {Navigate} from 'react-router-dom';
function ProtectedRouter({children}) {
    const isAdmin =localStorage.getItem('admin');
    // return isAdmin ? children : <Navigate to="/login" />;

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRouter;