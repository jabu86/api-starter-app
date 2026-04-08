import {Link, Outlet} from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function CustomerLayout () {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
   const handleLogout = async () => {
       await logout();
       navigate("/login");
   }
    return (
        <>

            <header className="header">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                {!user ? (
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>

                ) : (
                    <ul>
                        <li><span>{user.email}</span></li>
                        <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                )}
            </header>
            <main className="container">
                <Outlet/>
            </main>
        </>
    )
}

export default CustomerLayout;