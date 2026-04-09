import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";

function Header() {

    const { user, logout } = useAuth();
    const [dropDown, setDropDown] = useState(false)
    console.log(user);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }
    const handleDropDown = () => {
        setDropDown(!dropDown);
    }
    return (
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
                <ul className="dropdown">
                    <li ><span onClick={handleDropDown}>{user.email}</span></li>
                    <div className="dropdown-item">

                        {dropDown &&(
                            <>
                                <li>{user.roles.includes('admin') && (<Link to="/admin">Admin</Link>)}</li>
                                <li><Link to={`/profile/${user.name}`}>Profile</Link></li>
                                <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                            </>
                        )}
                    </div>

                </ul>
            )}
        </header>
    )
}

export default Header;