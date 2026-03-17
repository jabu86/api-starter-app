import AdminLayout from "../../layouts/AdminLayout.jsx";
import {Outlet} from "react-router-dom";

function Header({handleSideBarClick}){



    return (
        <nav className="admin-header">
            <div className="header-toggle-button" onClick={handleSideBarClick}>&#9776;</div>
            <ul className="admin-menu">
                <li>John Doe</li>
            </ul>
        </nav>
    )
}
export default Header;