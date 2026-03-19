import AdminLayout from "../../layouts/AdminLayout.jsx";
import {Outlet} from "react-router-dom";

function Header({handleSideBarClick}){



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="btn btn-dark text-bg-light p-lg-2 m-1" onClick={handleSideBarClick}><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse float-end">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 float-end">
                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                John Doe
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Header;