import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Header({ handleSideBarClick }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand bg-body border-bottom">
      <div className="container-fluid">
        <button
          className="btn btn-dark text-bg-light p-lg-2 m-1"
          onClick={handleSideBarClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-right">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown user-menu">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.email}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link to={`/profile/${user.name}`} className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
