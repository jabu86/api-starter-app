import {Link, Outlet} from 'react-router-dom'
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/auth/Login.jsx";




function CustomerLayout () {

    return (
        <div >
            <nav className="header">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            <main className="container">
                <Outlet />
            </main>
        </div>
    )
}

export default CustomerLayout;