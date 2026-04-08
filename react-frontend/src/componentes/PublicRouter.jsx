import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // If user is logged in → block access
    if (user) {
        // Optional: role-based redirect
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;